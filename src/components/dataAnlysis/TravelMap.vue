<template>
  <div class="travel-view">
    <div id="main"></div>
  </div>
</template>

<script>
import {travel} from '@/api/api'
import geoJson from '@/assets/data.json'
export default {
 data(){
  return {

  }
 },
 created(){
   travel().then(res =>{
    if(res.data.status === 200){
      let{ points,linesData} = res.data.data
      console.log(linesData);
      this.draw(points,linesData)
    }
   })
 },
 methods:{
   draw(points,linesData){
      let myChart = this.$echarts.init(document.getElementById('main'))
  //地图注册，必须包括geo组件或者map图表类型的时候才可以使用
  this.$echarts.registerMap('china',geoJson)
  console.log(geoJson);
  let option = {
    backgroundColor:'rgb(121,145,209)',
    geo: {
      map: 'china',
      //长宽比
      aspectScale:0.75,
      zoom:1.1,//视角缩放比
      itemStyle: {
         normal: {
          areaColor: {
            type: 'radial',//径向渐变
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
              offset: 0,
              color: '#09132c',//0%处的颜色
              },
               {
              offset: 1,
              color: '#271d68',//100%处的颜色
              }  
            ],
            globalCoord: true
          },
          shadowColor: 'rgb(58,115,192)',//分层效果
          shadowOffsetX:10,
          shadowOffsetY:11,
         }
      },
      regions:[{
         name: '南海诸岛',
        itemStyle: {
                      opacity: 0
                  }
      }]
    },
    series:[
      {
        //配置地图相关参数,绘制地图,对象关于地图图表相关设置
         type: 'map',
        label: {
            normal: {
                show: true,
                textStyle: {
                    color: '#1DE9B6'
                }
            },
            emphasis: {
                textStyle: {
                color: 'rgb(183, 185, 14)'
                }
            }
        },
         zoom: 1.1,
         map: 'china',
         itemStyle: {
         normal: {
           backgroundColor:'rgb(147,235,248)',
           borderWidth: 1,
           areaColor: {
            type: 'radial',//径向渐变
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
              offset: 0,
              color: 'rgb(31,54,150)',//0%处的颜色
              },
               {
              offset: 1,
              color: 'rgb(89,128,142)',//100%处的颜色
              }  
            ],
            globalCoord: true
          }
        },
        emphasis:{
          areaColor: 'rgb(46,229,206)',//选中后的颜色
          borderWidth:0.1,
        }
      }
      
      },
      {
        type:'effectScatter', //散点图
        //坐标系
        coordinateSystem:'geo',
        showEffectOn: 'render',
        symbolSize: 10,//散点大小
        zlevel: 1,
        data: points,
        rippleEffect: {
          //涟漪特效相关配置
          period: 15,
          scale:4,
          brushType:'fill',
        }
      },
      //关于地图中线路动画效果显示
      {
        type: 'lines',
        zlevel: 2,//层级
        effect: {
          show:true,
          period: 4,
          symbol: 'arrow', //样式为箭头?
          symbolSize: 7,
          trailLength: 0.4,//拖尾  
        },
        lineStyle: {
          normal: {
            color: '#1DE9B6',
            width: 1,
            opacity: 0.1,
            curveness:0.5,//线的弯曲程度
          }
        },
        data: linesData,
      },
    ]
  }
   myChart.setOption(option)
   }
 }
}
</script>

<style lang="scss">
 .travel-view{
  width: 100%;
   #main{
    width: 100%;
    height: 600px;
    margin: 0 auto;
   }
 }
</style>