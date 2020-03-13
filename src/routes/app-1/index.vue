<template>
  <div class="app">
    <div class="container">
      <div class="col-1">
        <app-category
          v-for="category in categories"
          :key="category.name"
          class="gap"
          @add-sample="onAddSample"
          @name-changed="onNameChanged"
          @remove-item="onRemoveItem"
          :video-settings="videoSettings"
          :category="category"
        />
        <div class="panel item add-item gap" @click="addNewCategory">+ 添加新分类</div>
      </div>
      <div class="col-2">
        <i class="icon-arrow-right2"></i>
        <app-train :state="state" @start-train="train" />
        <i class="icon-arrow-right2 right"></i>
      </div>
      <div class="col-3">
        <div class="panel predict" v-show="state.stage === 2">
          <div class="webcam">
            <video ref="video" :width="videoSettings.width" :height="videoSettings.height" autoplay></video>
            <canvas
              ref="canvas"
              :width="videoSettings.width"
              :height="videoSettings.height"
              style="display:none"
            />
            <div class="button" @click="predict">{{state.isPredicting? '停止': '预测'}}</div>
          </div>
          <div class="catetory-items">
            <div class="gap label">{{state.itemName}}</div>
            <div v-for="(category,index) in categories" class="catetory-item gap" :key="index">
              <div class="progress" :style="{width: category.percent * 100 + '%'}"></div>
              {{category.name + '(' + (category.percent * 100).toFixed(2) + '%' + ')'}}
            </div>
          </div>
        </div>
        <div class="panel predict" v-show="state.stage !== 2">模型</div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss" />
