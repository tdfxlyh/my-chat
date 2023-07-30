
/*
	主要用于数组排序
	例子:
	let list = [
	    {id: 1, name: '章三'},
	    {id: 10, name: 'wangwu'},
	    {id: 2, name: 'list'}
	]
	// 用id 字段做升序排序
	let d = list.sort(compare('id', true))
	console.log(d) // [{id: 1, name: '章三'}, {id: 2, name: 'list'}, {id: 10, name: 'wangwu'}]
*/

/** 两个参数： 参数1 是排序用的字段， 参数2 是：是否升序排序 true 为升序，false为降序*/
function compare(attr,rev) {
	if(rev ==  undefined){
		rev = 1;
	}else{
		rev = (rev) ? 1 : -1;
	}
	return (a,b) => {
		a = a[attr];
		b = b[attr];
		if(a < b){
			return rev * -1;
		}
		if(a > b){
			return rev * 1;
		}
		return 0;
	}
}

export default compare 