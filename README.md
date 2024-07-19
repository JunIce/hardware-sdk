# 大华 NVR 设备 web 开发 SDK

## Introduction

## install

```bash
npm install --save @rhonjoe/hardware-sdk
```

## usage

以 vue 为例

```vue
<script>
import { dayjs } from "element-plus";
import { DH_NVR } from "./rpc";
import { throttle } from "lodash-es";

export default {
  data() {
    return {
      dhInstance: new DH_NVR("192.168.1.1", "80"),

      maxSecs: 100,
      playCurrentTime: 0,
      form: {},
      changeTime: false,
    };
  },
  mounted() {
    this.init();
    this.dhInstance.on(
      "updateTimeStamp",
      throttle((e) => {
        // 时间线变化
        this.playCurrentTime = Math.floor(
          (dayjs(e.timestamp * 1000) - this.startSecs) / 1000
        );
      }, 500)
    );
  },
  beforeDestroy() {
    this.dhInstance.off("updateTimeStamp");
    this.dhInstance.destroy();
  },
  methods: {
    // 初始化，登录获取通道列表
    async init() {
      this.dhInstance
        .Login({
          username: this.username,
          password: this.password,
          ip: this.IP,
        })
        .then((res) => {
          return this.dhInstance.getProductDefinition();
        })
        .then((res) => {
          return this.dhInstance.getAllCameraList();
        })
        .then((res) => {
          // camera list
          console.log(res.allArr);
        });
    },

    // 查询时间段内录像列表
    getList() {
      if (!this.form.timeRange || this.form.timeRange.length == 0) {
        this.$message.warning("请选择开始时间和结束时间");
        return;
      }

      if (!this.form.channel) {
        this.$message.warning("请选择通道");
        return;
      }

      this.dhInstance
        .searchPlaybackList({
          startTime: this.form.timeRange[0],
          endTime: this.form.timeRange[1],
          channel: Number(this.form.channel),
        })
        .then((list) => {
          console.log(list);
          this.list = list;
        });
    },

    // 播放录像视频，选中行数据
    playVideo(row) {
      let startSecs = dayjs(row.StartTime);
      this.startSecs = startSecs;
      let endSecs = dayjs(row.EndTime);
      // console.log(startSecs, endSecs);
      this.maxSecs = Math.floor((endSecs - startSecs) / 1000);

      this.dhInstance.previewFileUrl(true, row.FilePath, row.$index, {
        channel: this.form.channel,
        canvasRef: this.$refs.canvasRef,
        videoRef: this.$refs.videoRef,
      });
    },

    // 播放暂停
    handleVideoPlay() {
      if (!this.dhInstance.player) {
        this.$message.warning("请选择播放视频");
        return;
      }
      if (this.dhInstance.status == 0) {
        this.dhInstance.play();
      } else {
        this.dhInstance.pause();
      }
    },

    // 指定播放时间，可以做拖动
    handlePlayTimeChange() {
      this.dhInstance.playAtTime(this.playCurrentTime);
    },
  },
};
</script>
```
