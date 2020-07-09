import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/movie',
    component : () => import('../views/Movie'),
	children:[
		{
			path: 'city',
			component : () =>import('../components/City')
		},
		{
			path: 'nowplaying',
			component : () =>import('../components/NowPlaying')
		},
		{
			path: 'comingsoon',
			component : () =>import('../components/ComingSoon')
		},
		{
			path: 'search',
			component : () =>import('../components/Search')
		},
		{
			path:'detail/1/:movieId',
			components:{
				default: () => import('../components/NowPlaying'),
				detail : () =>import('../views/Movie/detail')
			},
			props : {
				detail: true
				
			}
		},
		{
			path:'detail/2/:movieId',
			components:{
				default: () => import('../components/ComingSoon'),
				detail : () =>import('../views/Movie/detail')
			},
			props : {
				detail: true
				
			}
		},
		{
			  path:'/movie',
			  redirect:'/movie/nowplaying'
		}
		
	]
	
  },
  {
    path: '/cinema',
    component : () => import('../views/Cinema'),
  },
  {
    path: '/mine',
    component : () => import('../views/Mine')
  },
  {
	  path:'/*',
	  redirect:'/movie'
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
