<template>
  <div>
    <el-upload ref="avatar" class="relative flex h-48 w-full border-dashed border-2 rounded-lg mb-2"
      accept="image/png, image/jpeg" action="/" list-type="picture" :auto-upload="false" :show-file-list="false"
      :on-change="beforeAvatarUpload">
      <div class="w-full h-full absolute bg-gray-200 grid">
        <img v-if="imageCropped" :src="image" class="w-full h-48 rounded-md place-self-center" />
        <i v-else ref="getFile" class="el-icon-plus w-5 h-5 place-self-center" />
      </div>
    </el-upload>

    <el-dialog width="45%" :visible.sync="dialogCropperVisible" :show-close="false" :destroy-on-close="true"
      custom-class="dialog-cropper" append-to-body center>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCropperVisible = !dialogCropperVisible">Cancelar</el-button>
        <el-button type="primary" @click="getCrop">Cortar</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
export default {

  props: {
    image: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      option: {
        size: 1,
        outputType: 'jpeg',
        autoCrop: true,
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: false,
        centerBox: true,
        fixed: true,
        mode: '100%',
      },
      imageCropped: false,
      imageOriginal: false,
      dialogCameraVisible: false,
      dialogCropperVisible: false,
      hasCamera: true,
    }
  },
  watch: {
    image() {
      this.imageCropped = this.image || false
      this.imageOriginal = this.image || false
    },
  },
  mounted() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia

    this.imageCropped = this.image || false
  },
  methods: {
    editPhoto() {
      if (this.$refs.cropper) this.$refs.cropper.refresh()
      this.dialogCropperVisible = true
    },
    getCrop() {
      this.$refs.cropper.getCropData((data) => {
        this.imageCropped = data
        this.emitPhoto()
        this.dialogCropperVisible = false
      })
    },

    async beforeAvatarUpload(file) {
      console.log(file);
      const reader = new FileReader()
      const blob = await fetch(file.url).then((r) => r.blob())

      reader.readAsDataURL(file)
      reader.onloadend = () => {
        this.imageCropped = this.imageOriginal = reader.result
        this.emitPhoto()
      }
    },
    emitPhoto() {
      this.$emit('input', this.imageCropped)
    },
  },
}
</script>
  
<style>
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}

canvas,
.container-cropper {
  width: 400px;
  height: 400px;
}

.dialog-cropper>div.el-dialog__header {
  display: none;
}

.dialog-cropper>div.el-dialog__body {
  display: inline-flex;
}

video {
  display: flex;
  width: 100%;
}

canvas {
  display: none;
}
</style>