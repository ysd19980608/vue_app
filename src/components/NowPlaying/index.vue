<template>
	<div class="movie_body" ref='movie_body'>
		<Loading v-if="isLoading"></Loading>
		<Scroller v-else :handToScroll = 'handToScroll' :handleToTouchEnd='handleToTouchEnd'>
		<ul>
			<li v-for="item in movieList" :key='item.id'>
				<div class="pic_show" @tap='handleToDetail(item.id)'><img :src="item.img | setWH('128.180')"></div>
				<div class="info_list">
					<h2 @tap='handleToDetail(item.id)'>{{item.nm}} <img v-if="item.version" src="../../../public/img/3dimg.png"/> </h2>
					<p><span class="person">{{item.wish}}</span> 人想看</p>
					<p>{{item.star}}</p>
					<p>{{item.rt}}</p>
				</div>
				<div class="btn_pre">
					购票
				</div>
			</li>
		</ul>
		</Scroller>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	
	export default {
		name: 'NowPlaying',
		data(){
			return {
				movieList: [] ,
				pullDownMsg: '',
				isLoading: true, //loading的判断
				prevCityId: -1
			}
		},
		activated(){
			//获取store传输过来的值，用以切换城市
			var cityId = this.$store.state.city.id;
			//当两数值不等，说明切换了城市，相等的话直接return 不执行下面代码（提速）
			if(this.prevCityId == cityId ){
				return;
			}
			this.isLoading = true ;
			this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{
				//console.log(112233);
				var msg = res.data.msg;
				if(msg === 'ok'){
					this.movieList = res.data.data.movieList;
					this.isLoading = false ; //数组加载成功Loading为false
					this.prevCityId = cityId;
					
					/* 让滑动更流畅 */
					/* this.$nextTick(()=>{
						var scroll= new BScroll(this.$refs.movie_body,{
							//开启div中放入tap事件
							tap:true,
							probeType:1
						});
						//上拉事件
						scroll.on('scroll',(pos)=>{
							//当Y轴拉动到一定像素启动
							if(pos.y > 30){
								this.pullDownMsg = "正在更新中";
							}
							
						});
						//滑动结束事件
						scroll.on("touchEnd",(pos)=>{
							if(pos.y > 30){
								this.axios.get('/api/movieOnInfoList?cityId=10').then((res)=>{
									var msg = res.data.msg;
									if(msg === 'ok'){
										this.pullDownMsg = "更新成功";
										//延迟一秒后刷新界面同时置空上拉内容
										setTimeout(()=>{
											this.movieList = res.data.data.movieList;
											this.pullDownMsg = '';
										},1000);
										
										}
								});
								
							}
						});
					}) */;
					
					
				}
			});
		},
		methods:{
			handleToDetail(movieId){
				this.$router.push('/movie/detail/1/'+ movieId);
			},
			handToScroll(pos){
				 if(pos.y > 30){
				 	this.pullDownMsg = "正在更新中";
				 }
			},
			handleToTouchEnd(pos){
				if(pos.y > 30){
					this.axios.get('/api/movieOnInfoList?cityId=10').then((res)=>{
						var msg = res.data.msg;
						if(msg === 'ok'){
							this.pullDownMsg = "更新成功";
							//延迟一秒后刷新界面同时置空上拉内容
							setTimeout(()=>{
								this.movieList = res.data.data.movieList;
								this.pullDownMsg = '';
							},1000);
							
							}
					});
					
				}
			}
		}
	}
</script>

<style scoped="scoped">
	#content .movie_body{ flex:1; overflow:auto;}
	.movie_body ul{ margin:0 12px; overflow: hidden;}
	.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
	.movie_body .pic_show{ width:64px; height: 90px;}
	.movie_body .pic_show img{ width:100%;}
	.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
	.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
	.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
	.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
	.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
	.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
	.movie_body .btn_pre{ background-color: #3c9fe6;}
	.movie_body .pulldown{margin: 0;border: 0;padding: 0;}
</style>
