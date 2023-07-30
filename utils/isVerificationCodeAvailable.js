function isVerificationCodeAvailable(str){  
	var myreg=/^[0-9]{6}$/;  
	if (!myreg.test(str)) {  
		return false;  
	} else {  
		return true;  
	}  
} 

export default isVerificationCodeAvailable