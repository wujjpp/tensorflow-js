<template>
  <div class="app-category">
    <div class="panel item">
      <div class="header">
        <div>
          <input
            ref="input"
            type="text"
            :class="{edit: isEditing}"
            v-model="categoryName"
            @keyup.enter="completedEdit"
            :readonly="!isEditing"
          />
          <i class="icon-pencil" v-if="!isEditing" @click="setEdit"></i>
          <i class="icon-checkmark2" v-if="isEditing" @click="completedEdit"></i>
        </div>
      </div>
      <div class="body">
        <div class="capture" v-show="!isPreview">
          <video ref="video" :width="videoSettings.width" :height="videoSettings.height" autoplay></video>
          <div class="toolbox">
            <span class="button" @click="toggleCapture">{{isCapturing ? '停止':'开始采集'}}</span>
          </div>
          <canvas
            ref="canvas"
            :width="videoSettings.width"
            :height="videoSettings.height"
            style="display:none"
          />
        </div>
        <div>
          <div class="sample-count">{{category.items.length}}个样本</div>
          <div class="show-all" @click="toggleShowAll">{{isShowAll? '收起' : '展开'}}</div>
          <div class="clear-fix"></div>
        </div>

        <div :class="{preview : true, collapsed: !isShowAll}" v-scroll>
          <div>
            <div class="get-sample" v-show="isPreview" @click="togglePreview">采集样本</div>
            <div v-for="img in category.items" class="img-item">
              <img :src="img.url" width="80" />
              <div class="remove" @click="remove(img)">x</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./component.js"></script>

<style lang="scss" src="./style.scss" scoped></style>