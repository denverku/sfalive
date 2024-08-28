window.onload = function () {


    // closePageLoding();
 
     get_auth_status();
 
 };
 
 function get_auth_status() {
 
     $.ajax({
         type: 'POST',
         url: 'https://www.infinitymarket.net/api/smsauth/sms_status',
         headers: { 'Authorization': 'infinitymarketinfinitymarket!@#$' },
         dataType: 'json',
         async: false,
         success: function (data) {
             console.log(data);
             if (data.result_code == 400) {
                 alert(data.result_message);
                 return;
             } else if (data.result_code != 200) {
                 globalPopup('alert', 'Fail', 'Please try again.', '', false);
                 return;
             }
 
             if (data.sms_result !== true) {
                 globalPopup('alert', '', 'Already authenticated.', 'location.href="/"', false);
                 return;
             }
 
             document.getElementById('countrycode_select').disabled = true;
 
             document.getElementById('mobile_number_input').disabled = false;
             document.getElementById('mobile_send_button').disabled = false;
         
             document.getElementById('authcode_input').disabled = true;
             document.getElementById('mobil_auth_button').disabled = true;
         }
     });
 }
 
 function send_authcode() {
 
     var countrycode_select_val = document.getElementById('countrycode_select');
     const country_no = countrycode_select_val.options[countrycode_select_val.options.selectedIndex].text;
     const hp_no = document.getElementById('mobile_number_input').value;
 
     if(country_no == null || country_no.length == 0 )
     {
         globalPopup('alert', 'Country code', 'Please select a country code.', '', false);
         return;
     }
 
     if(hp_no == null || hp_no.length == 0 )
     {
         globalPopup('alert', 'Mobile number', 'Please enter your mobile number.', '', false);
         return;
     }
 
     $.ajax({
         type: 'POST',
         url: 'https://www.infinitymarket.net/api/smsauth/send_sms',
         headers: { 'Authorization': 'infinitymarketinfinitymarket!@#$' },
         dataType: 'json',
         async: false,
         data : {
             'country_no': country_no
             ,'hp_no': hp_no
         },
         success: function (data) {
             console.log(data);
             if (data.result_code == 400) {
                 alert(data.result_message);
                 return;
             } else if (data.result_code != 200) {
                 globalPopup('alert', 'Fail', 'Please try again.', '', false);
                 return;
             }
 
             if (data.sms_result !== true) {
                 globalPopup('alert', 'Fail', data.sms_result_msg, '', false);
                 return;
             }
 
             document.getElementById('mobile_number_input').disabled = true;
             document.getElementById('mobile_send_button').disabled = true;
             
             document.getElementById('authcode_input').disabled = false;
             document.getElementById('mobil_auth_button').disabled = false;
 
             globalPopup('info', 'Success', data.sms_result_msg, '', false);
         }
     });
 }
 
 function auth_sms() {
 
     var countrycode_select_val = document.getElementById('countrycode_select');
     const country_no = countrycode_select_val.options[countrycode_select_val.options.selectedIndex].text;
     const hp_no = document.getElementById('mobile_number_input').value;
     const authcode = document.getElementById('authcode_input').value;
 
     console.log(authcode);
 
     if(country_no == null || country_no.length == 0 )
     {
         globalPopup('alert', 'Country code', 'Please select a country code.', '', false);
         return;
     }
 
     if(hp_no == null || hp_no.length == 0 )
     {
         globalPopup('alert', 'Mobile number', 'Please enter your mobile number.', '', false);
         return;
     }
 
     if(authcode == null || authcode.length == 0 )
     {
         globalPopup('alert', 'Auth code', 'Please enter your authcode.', '', false);
         return;
     }
 
     $.ajax({
         type: 'POST',
         url: 'https://www.infinitymarket.net/api/smsauth/auth_sms',
         headers: { 'Authorization': 'infinitymarketinfinitymarket!@#$' },
         dataType: 'json',
         async: false,
         data : {
             'country_no': country_no
             ,'hp_no': hp_no
             ,'cert_no': authcode
         },
         success: function (data) {
             console.log(data);
             if (data.result_code == 400) {
                 alert(data.result_message);
                 return;
             } else if (data.result_code != 200) {
                 globalPopup('alert', 'Fail', 'Please try again.', '', false);
                 return;
             }
 
             if (data.sms_result !== true) {
                 globalPopup('alert', 'Fail', data.sms_result_msg, '', false);
                 return;
             }
 
             globalPopup('info', 'Success', data.sms_result_msg, 'location.href="/account"', false);
         }
     });
 }