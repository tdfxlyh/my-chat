function isPhoneAvailable(str){  
	var myreg=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;  
	if (!myreg.test(str)) {  
		return false;  
	} else {  
		return true;  
	}  
} 

export default isPhoneAvailable