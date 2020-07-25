class APIManager{
	static loginTeam(email, password){
	    var objParam = {
	    	data:'{"email":"'+email+'","password":"'+password+'"}'
	    };
	    var url = baseUrlApi + 'login_team';
	    return Promise.resolve($.post(url, objParam));
	}

	static loginAdmin(email, password){
	    var objParam = {
	    	data:'{"email":"'+email+'","password":"'+password+'"}'
	    };
	    var url = baseUrlApi + 'login_admin';
	    return Promise.resolve($.post(url, objParam));
	}

	static logout(token){
	    var objParam = {
	    	token: token
	    };
	    var url = baseUrlApi + 'logout';
	    return Promise.resolve($.post(url, objParam));
	}

	static changePassword(token, passwordOld, passwordNew){
	    var objParam = {
	    	token: token,
	    	data:'{"password_old":"'+passwordOld+'","password_new":"'+passwordNew+'"}'
	    };
	    var url = baseUrlApi + 'change_password';
	    return Promise.resolve($.post(url, objParam));
	}

	static forgotPasswordTeam(email){
	    var objParam = {
	    	data:'{"email":"'+email+'"}'
	    };
	    var url = baseUrlApi + 'forgot_password';
	    return Promise.resolve($.post(url, objParam));
	}

	static fetchEvent(){
	    var objParam = {};
	    var url = baseUrlApi + 'event/fetch_event';
	    return Promise.resolve($.post(url, objParam));
	}

	static addMember(token, arrDataMember){
	    var objParam = {
	    	token: token,
	    	data:'{"data_member":'+arrDataMember+'}'
	    };
	    var url = baseUrlApi + 'team/add_member';
	    return Promise.resolve($.post(url, objParam));
	}

	static updateMember(token, fullName, handphone, line, gender, imageStudentCard, memberId){
	    var objParam = {
	    	token: token,
	    	data:'{"full_name":"'+fullName+'","handphone":"'+handphone+'","line":"'+line+'","gender":"'+gender+'","image_student_card":"'+imageStudentCard+'","member_id":"'+memberId+'"}'
	    };
	    var url = baseUrlApi + 'team/update_member';
	    return Promise.resolve($.post(url, objParam));
	}

	static fetchMember(token){
	    var objParam = {
	    	token: token
	    };
	    var url = baseUrlApi + 'team/fetch_member';
	    return Promise.resolve($.post(url, objParam));
	}

	static updateProfileTeam(token, schoolName, name){
	    var objParam = {
	    	token: token,
	    	data:'{"school_name":"'+schoolName+'","name":"'+name+'"}'
	    };
	    var url = baseUrlApi + 'team/update_profile_team';
	    return Promise.resolve($.post(url, objParam));
	}

	static register(email, password, name, schoolName, competitionId, fullName, handphone, line, gender, imageStudentCard, hanyaKetua){
	    var objParam = {
	    	data:'{"school_name":"'+schoolName+'", "hanya_ketua":"'+hanyaKetua+'","name":"'+name+'","email":"'+email+'","password":"'+password+'","competition_id":"'+competitionId+'","full_name":"'+fullName+'","handphone":"'+handphone+'","line":"'+line+'","gender":"'+gender+'","image_student_card":"'+imageStudentCard+'"}'
	    };
	    var url = baseUrlApi + 'team/register';
	    return Promise.resolve($.post(url, objParam));
	}

	static addBuktiPembayaran(token, competitionTeamId, note, image){
	    var objParam = {
	    	token: token,
	    	data:'{"note":"'+note+'","image":"'+image+'","competition_team_id":"'+competitionTeamId+'"}'
	    };
	    var url = baseUrlApi + 'team/add_bukti_pembayaran';
	    return Promise.resolve($.post(url, objParam));
	}

	static updateStatusBayarTeam(token, statusBayar){
	    var objParam = {
	    	token: token,
	    	data:'{"status_bayar":"'+statusBayar+'"}'
	    };
	    var url = baseUrlApi + 'team/update_status_bayar_team';
	    return Promise.resolve($.post(url, objParam));
	}

	static fetchTeam(token, filterRegisterData, filterOnlineOffline, filterQualifiedFinal, filterBayar){
	    var objParam = {
	    	token: token,
	    	data:'{"filter_register_data":"'+filterRegisterData+'","filter_online_offline":"'+filterOnlineOffline+'","filter_qualified_final":"'+filterQualifiedFinal+'","filter_bayar":"'+filterBayar+'"}'
	    };
	    var url = baseUrlApi + 'admin/fetch_team';
	    return Promise.resolve($.post(url, objParam));
	}

	static updateRegisterStatusTeam(token, teamId, statusRegister, note = '', deleteAccount = ''){
	    var objParam = {
	    	token: token,
	    	data:'{"team_id":"'+teamId+'","status_register":"'+statusRegister+'","note":"'+note+'","delete_account":"'+deleteAccount+'"}'
	    };
	    var url = baseUrlApi + 'admin/update_status_register_team';
	    return Promise.resolve($.post(url, objParam));
	}

	static updateStatusBayarTeamByAdmin(token, teamId, statusBayar, note = '', deleteAccount = ''){
	    var objParam = {
	    	token: token,
	    	data:'{"status_bayar":"'+statusBayar+'","team_id":"'+teamId+'"}'
	    };
	    var url = baseUrlApi + 'admin/update_status_bayar_team';
	    return Promise.resolve($.post(url, objParam));
	}

	static updateStatusOnOffTeam(token, teamId, statusOnOff, note = '', deleteAccount = ''){
	    var objParam = {
	    	token: token,
	    	data:'{"team_id":"'+teamId+'","status_on_off":"'+statusOnOff+'"}'
	    };
	    var url = baseUrlApi + 'admin/update_status_on_off_team';
	    return Promise.resolve($.post(url, objParam));
	}

	static updateStatusQualifiedFinalTeam(token, teamId, statusQualifiedFinal, note = '', deleteAccount = ''){
	    var objParam = {
	    	token: token,
	    	data:'{"team_id":"'+teamId+'","status_qualified_final":"'+statusQualifiedFinal+'"}'
	    };
	    var url = baseUrlApi + 'admin/update_status_qualified_final_team';
	    return Promise.resolve($.post(url, objParam));
	}

	static fetchMember(token){
	    var objParam = {
	    	token: token
	    };
	    var url = baseUrlApi + 'team/get_all_status';
	    return Promise.resolve($.post(url, objParam));
	}

	static mailInfo(token, arrTeamId, subject, content){
	    var objParam = {
	    	token: token,
	    	data:'{"arr_team_id":"'+arrTeamId+'","subject":"'+subject+'","content":"'+content+'"}'
	    };
	    var url = baseUrlApi + 'mail/mail_info';
	    return Promise.resolve($.post(url, objParam));
	}

	static fetchPoint(token){
	    var objParam = {
	    	token: token
	    };
	    var url = baseUrlApi + 'cso/fetch_point';
	    return Promise.resolve($.post(url, objParam));
	}

	static updatePoint(token, arrPoint){
	    var objParam = {
	    	token: token,
	    	data:'{"arr_point":'+arrPoint+'}'
	    };
	    var url = baseUrlApi + 'cso/update_point';
	    return Promise.resolve($.post(url, objParam));
	}

	static fetchUploadZipTeam(token, tahap){
	    var objParam = {
	    	token: token,
	    	data:'{"tahap":'+tahap+'}'
	    };
	    var url = baseUrlApi + 'webcon/fetch_upload_zip_team';
	    return Promise.resolve($.post(url, objParam));
	}

	static fetchQuiz(token){
	    var objParam = {
	    	token: token,
	    };
	    var url = baseUrlApi + 'cso/fetch_quiz';
	    return Promise.resolve($.post(url, objParam));
	}

	static fetchQuizOne(token, id){
	    var objParam = {
	    	token: token,
	    	data: '{"id":'+id+'}'
	    };
	    var url = baseUrlApi + 'cso/fetch_quiz_one';
	    return Promise.resolve($.post(url, objParam));
	}

	static uploadZipTeam(token, tahap, projectName, projectBase64){
	    var objParam = {
	    	token: token,
	    	data: '{"tahap":'+tahap+',"project_name":"'+projectName+'","project_base_64":"'+projectBase64+'"}'
	    };
	    var url = baseUrlApi + 'webcon/upload_zip';
	    return Promise.resolve($.post(url, objParam));
	}

	static updateQuiz(token, id, image, question, multipleChoice1, multipleChoice2, multipleChoice3, multipleChoice4, multipleChoice5, answerKey){
	    var objParam = {
	    	token: token,
	    	data: '{"id":'+id+',"image":"'+image+'","question":"'+question+'","multiple_choice_1":"'+multipleChoice1+'","multiple_choice_2":"'+multipleChoice2+'","multiple_choice_3":"'+multipleChoice3+'","multiple_choice_4":"'+multipleChoice4+'","multiple_choice_5":"'+multipleChoice5+'","answer_key":"'+answerKey+'"}'
	    };
	    var url = baseUrlApi + 'cso/update_quiz';
	    return Promise.resolve($.post(url, objParam));
	}

	static fetchPointTeam(token){
	    var objParam = {
	    	token: token
	    };
	    var url = baseUrlApi + 'cso/fetch_point_team';
	    return Promise.resolve($.post(url, objParam));
	}

	static uploadAnswerTeam(token, arrAnswer){
     var objParam = {
      token: token,
      data: '{"arr_answer":'+arrAnswer+'}'
     };
     var url = baseUrlApi + 'cso/upload_answer_team';
     return Promise.resolve($.post(url, objParam));
 }

	static syncAnswerTeam(token){
	    var objParam = {
	    	token: token,
	    	data: '{"flag":"[1,2,3]"}'
	    };
	    var url = baseUrlApi + 'cso/sync_answer_team';
	    return Promise.resolve($.post(url, objParam));
	}

	static uploadCSVQuiz(token, arrQuiz){
	    var objParam = {
	    	token: token,
	    	data: '{"arr_quiz":'+arrQuiz+'}'
	    };
	    var url = baseUrlApi + 'cso/upload_csv_quiz';
	    return Promise.resolve($.post(url, objParam));
	}

	static startStopCompetition(token, flag, id){
	    var objParam = {
	    	token: token,
	    	data: '{"flag":'+flag+',"id":'+id+'}'
	    };
	    var url = baseUrlApi + 'cso/start_stop_competition';
	    return Promise.resolve($.post(url, objParam));
	}
}
