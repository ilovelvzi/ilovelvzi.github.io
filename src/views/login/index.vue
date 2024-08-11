<script setup lang="ts">
// import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useStore from "@/store";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "@/utils/time";

const { user } = useStore();
const router = useRouter();
const route = useRoute();

const formData = reactive({
  username: "admin",
  password: "111111",
});
const rules = reactive({
  username: [
    { required: true, message: "账号不能为空", trigger: "blur" },
    { min: 5, max: 10, message: "账号长度请输入五到十位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 15, message: "密码长度请输入六到十五位", trigger: "blur" },
  ],
});

const loading = ref(false);
const loginFormRef = ref();

// 登录
const login = async () => {
  await loginFormRef.value.validate();
  loading.value = true;
  try {
    await user.login(formData);
    if (route.query.redirect) {
      router.push(route.query.redirect as string);
    } else {
      router.push("/");
    }
    ElNotification({
      type: "success",
      title: `HI，${getTime()}好`,
      message: "欢迎回来！",
    });
    loading.value = false;
  } catch (error) {
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
    loading.value = false;
  }
};
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="formData"
          :rules="rules"
          ref="loginFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input prefix-icon="User" v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="formData.password"
              prefix-icon="Lock"
              :show-password="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              @click="login"
              :loading="loading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background-34eb3d2b.jpg") no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    top: 30vh;
    width: 65%;
    padding: 40px;
    box-shadow: #0000003d 0 3px 8px;
    h1 {
      font-size: 40px;
      color: white;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
