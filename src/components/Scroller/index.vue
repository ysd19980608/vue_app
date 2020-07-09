<template>
	<div class="wrapper" ref='wrapper'>
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name:'Scroller',
		props:{
			handToScroll : {
				type : Function,
				default: function(){},
				
			},
			handleToTouchEnd: {
				type : Function,
				default: function(){},
			}
		},
		mounted() {
			var scroll= new BScroll(this.$refs.wrapper,{
				//开启div中放入tap事件
				tap:true,
				probeType:1
			});
			this.scroll = scroll;
			//上拉事件
			scroll.on('scroll',(pos)=>{
				//当Y轴拉动到一定像素启动
				this.handToScroll(pos);
			});
			
			scroll.on('touchEnd',(pos)=>{
				this.handleToTouchEnd(pos);
			});
		},
		methods:{
			ToScrollTop(y){
				this.scroll.scrollTo(0,y);
			}
		}
		
	}
</script>

<style>
	.wrapper{height: 100%;}
</style>
