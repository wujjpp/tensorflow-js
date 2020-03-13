<template>
  <div class="app-2">
    <div class="preview-container">
      <canvas width="300" height="300" ref="canvas" class="preview-board"></canvas>
      <canvas width="300" height="300" ref="canvas2" class="preview-board"></canvas>
    </div>
    <div class="board-container">
      <table>
        <tr>
          <td>迭代 :</td>
          <td>{{epochs}} / {{totalEpochs}}</td>
        </tr>
        <tr>
          <td>精度 :</td>
          <td>{{acc}}</td>
        </tr>
        <tr>
          <td>损失 :</td>
          <td>{{loss}}</td>
        </tr>
        <tr>
          <td colspan="2" class="text-center">
            <button @click="init">Init</button>
            <button @click="train">Start</button>
          </td>
        </tr>
      </table>

      <div v-if="isStarting">
        <div class="chart-container">
          <chart :options="lossChartData" :auto-resize="true" />
        </div>
        <div class="chart-container">
          <chart :options="accChartData" :auto-resize="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss"></style>
<script src="./component.js"></script>
