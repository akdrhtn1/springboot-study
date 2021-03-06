$(function(){
   indexFocus();
   btnClick();
   validateAll();

});

function indexFocus(){
    $('#username').focusout(function(){
        idValidate($(this).val());
    })
    
    $('#password').focusout(function(){
        passwdValidate($(this).val());
    })

    $('#passwd2').focusout(function(){
        passwd2Validate($(this).val());
    })
    
}

function btnClick(){
    var arty ={};

    $('#idValidate').on("click",function(){
        $("#join_form").serializeArray().map(function(x){arty[x.name] = x.value;});
        console.log(arty);
        $.ajax({
            type : 'POST',
            url : '/idCheck',
            data : JSON.stringify(arty),
            dataType : 'json',
            contentType : 'application/json;charset=utf-8',
            success : function(data){
                if(!data){
                    alert('중복된 아이디가 아닙니다.!!');
                }else{
                    alert('중복된 아이디 입니다.')
                }
            },
            error: function(xhr, status, error){
                alert(error, status, xhr);
            }
        });
    });



}

function validateAll(){
  

    $('#btn-smit').click(function(){
        //아이디가 검증 값이 오류일 경우
        if('success' !== ($('#idMsg>p').prop('class'))){
            alert('아이디를 확인해주세요');
            $('#username').focus().val("");
            return false;
        }
        //비밀번호 검증 값이 오류일 경우
        if('success' !==  ($('#pswd1Msg>p').prop('class'))){
            alert('비밀번호를 확인해주세요');
            $('#password').focus().val("");
            return false;
        }
        //비밀번호2 검증 값이 오류일 경우
        if('success' !==  ($('#pswd2Msg>p').prop('class'))){
            alert('비밀번호를 확인해주세요');
            $('#passwd2').focus().val("");
            return false;
        }

        
        $('#join_form').submit();

    });
     
    //********최종 모두가 참일떄 실행되어야함 ****
       
}

function idValidate(id){
   const vali = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=\sㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
   if(vali.test(id) || id == ""){
       $('#idMsg').html('<p class="valiDate">아이디에는 공백, 특수문자, 한글이 들어갈 수 없습니다.</p>');
   }else{
       $('#idMsg').html('<p class="success">사용가능한 아이디 입니다.</p>');
   }  
}; 

function passwdValidate(passWd){
    const vali2 = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;
    if(vali2.test(passWd)){
        $('#pswd1Msg').html('<p class="success">안전한 비밀번호 입니다.</p>');
    }else{
        $('#pswd1Msg').html('<p class="valiDate">비밀번호는 10자 이상이어야 하며, 숫자/영문자/특수문자를 모두 포함해야 합니다.</p>');
    }
}

function passwd2Validate(passWd2){
    if(passWd2 == ""){
        $('#pswd2Msg').html('<p class="valiDate">값을 입력해주세요 </p>');
    }
    else if(passWd2 == $('#password').val()){
        /* 패스워드1번 비밀번호 형식 오류시 메시지(클레스명이 validate일 경우 오류) */
        if($('#pswd1Msg>p').attr('class') == "valiDate"){
            $('#pswd2Msg').html('<p class="valiDate">형식 오류 입니다. </p>');    
        }else{
            $('#pswd2Msg').html('<p class="success">비밀번호가 일치합니다.</p>');
        }
    }
    else{
        $('#pswd2Msg').html('<p class="valiDate">비밀번호가 일치 하지 않습니다.</p>');
    }
}

