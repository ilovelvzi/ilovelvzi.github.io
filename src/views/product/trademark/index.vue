<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { reqHasTrademark } from "@/api/product/trademark";
import { Records, TradeMarkResponseData } from "@/api/product/trademark/type";
import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";

const pageOn = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);
const hasTrademarkArr = ref<Records>([]);
const dialogVisible = ref<boolean>(false);
const trademarkForm = reactive({
  tmName: "",
  logoUrl: "",
});
const action = import.meta.env.VITE_APP_BASE_API + "/admin/product/fileUpload";

const getHasTrademark = async (page = 1) => {
  pageOn.value = page;
  const res: TradeMarkResponseData = await reqHasTrademark(
    pageOn.value,
    pageSize.value
  );
  total.value = res.data.total;
  hasTrademarkArr.value = res.data.records;
};

onMounted(() => {
  getHasTrademark();
});

const handleSizeChange = () => {
  getHasTrademark();
};

// 添加品牌按钮
const addHasTrademark = () => {
  dialogVisible.value = true;
};

// 编辑品牌按钮
const editHasTrademark = () => {
  dialogVisible.value = true;
};

// dialog取消按钮
const cancel = () => {
  dialogVisible.value = false;
};

// dialog确认按钮
const confirm = () => {
  dialogVisible.value = false;
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  trademarkForm.logoUrl = response.data;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/png" &&
    rawFile.type !== "image/gif"
  ) {
    ElMessage.error("上传的图片必须是jpeg|png|gif格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error("上传图片大小请勿超过4MB!");
    return false;
  }
  return true;
};
</script>

<template>
  <el-card>
    <el-button type="primary" icon="Plus" @click="addHasTrademark"
      >添加品牌</el-button
    >
    <el-table :data="hasTrademarkArr" border style="margin: 10px 0">
      <el-table-column align="center" label="序号" width="80px" type="index" />
      <el-table-column label="品牌名称" prop="tmName" />
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <img style="height: 100px; width: 100px" :src="row.logoUrl" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{}">
          <el-button
            size="small"
            icon="Edit"
            type="warning"
            @click="editHasTrademark"
          ></el-button>
          <el-button size="small" icon="Delete" type="danger"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageOn"
      v-model:page-size="pageSize"
      background
      :page-sizes="[3, 5, 8, 10]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasTrademark"
    />
  </el-card>

  <el-dialog v-model="dialogVisible" title="添加品牌">
    <el-form label-position="left" style="width: 80%">
      <el-form-item label="品牌名称" label-width="80px">
        <el-input
          v-model="trademarkForm.tmName"
          placeholder="请输入品牌名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="80px">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkForm.logoUrl"
            :src="trademarkForm.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel"> 取消 </el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
:deep() {
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
