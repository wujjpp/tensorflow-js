<template>
  <div class="app-train">
    <div class="panel train-panel">
      <div class="button gap" @click="train">训练</div>
      <div v-show="state.stage !== 0" class="gap">
        <div>迭代： {{state.epochs}} / {{state.EPOCHS}}</div>
        <div>损失： {{state.loss}}</div>
        <div>精度： {{state.acc}}</div>
      </div>
    </div>
  </div>
</template>

<script src="./component.js"></script>

<style lang="scss" src="./style.scss" scoped></style>
