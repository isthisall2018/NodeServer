var express = require('express');
var router = express.Router();
var db = require("../config/database");
var UUID = require('uuid');
var addSQL = 'INSERT INTO user_application_info SET  ?';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'respond with a resource' });
});
router.post("/add",function(req,res,next){
    var paper_num = req.body.paper_num;
    db.query('SELECT paper_num FROM user_application_info where paper_num='+paper_num+'','', function (error, results, fields) {
        if (error) {
        	throw error;
        	res.send({success:false, staus:'01', errMsg: error});
        }else{
        	var repeatFlag=false;
        	(results?results:[]).forEach(function(item,index){
        		if(paper_num==item.paper_num) {
        			repeatFlag=true;
        		}
        	});
        	if (results.length>0&&repeatFlag) {
        		res.send({success:false, staus:'02', errMsg:'该用户已经申请了'});
        	}else{
	        	var addSQLDatas;
	        	var obj = {
	        		id: UUID.v1(),
			    	user_name: req.body.user_name,
			    	user_sex: req.body.user_sex,
			    	user_age: req.body.user_age,
			    	education: req.body.education,
			    	paper_num: req.body.paper_num,
			    	marriage: req.body.marriage,
			    	user_phone: req.body.user_phone,
			    	server_pwd: req.body.server_pwd,
			    	money_info: req.body.money_info,
					zima_mark:	req.body.zima_mark,
					other_faith: req.body.other_faith,
					qq_num: req.body.qq_num,
					address: req.body.address,
					company_name: req.body.company_name,
					company_phone: req.body.company_phone,
					company_address: req.body.company_address,
					department: req.body.department,
					post: req.body.post,
					entry_time: req.body.entry_time?new Date(req.body.entry_time).format("yyyy-MM-dd"):'',
					annual_income: req.body.annual_income,
					contacts_1: req.body.contacts_1,
					contacts_1_name: req.body.contacts_1_name,
					contacts_1_tel: req.body.contacts_1_tel,
					contacts_2: req.body.contacts_2,
					contacts_2_name: req.body.contacts_2_name,
					contacts_2_tel: req.body.contacts_2_tel,
					contacts_3: req.body.contacts_3,
					contacts_3_name: req.body.contacts_3_name,
					contacts_3_tel: req.body.contacts_3_tel,
					is_faith_card: req.body.is_faith_card,
					is_card_overdue: req.body.is_card_overdue,
					bank1: req.body.bank1,
					quota1: req.body.quota1,
					bank2: req.body.bank2,
					quota2: req.body.quota2,
					bank3: req.body.bank3,
					quota3: req.body.quota3,
					bank4: req.body.bank4,
					quota4: req.body.quota4,
					faith_be_overdue: req.body.faith_be_overdue,
					is_other_loan: req.body.is_other_loan,
					is_loan_overdue: req.body.is_loan_overdue,
					other_loan_overdue: req.body.other_loan_overdue,
					phone_pwd: req.body.phone_pwd,
					hope_money: req.body.hope_money,
					in_people: req.body.in_people
			    };
			    if(obj.money_info.length>0){
					obj.money_info=obj.money_info.join(',')
				}else{
					obj.money_info='';
				}
	        	db.query(addSQL, obj ,function(err,rows){
			        if(err){
			            res.send("数据库操作失败"+err);
			        }else {
			            res.send({success:true, staus:'00', succMsg:'提交申请成功'});
			        }
			    });
	        }
        }       
    });
});
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}    

module.exports = router;