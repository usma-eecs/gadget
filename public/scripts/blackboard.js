top.jQuery.getScript('https://code.jquery.com/jquery-3.4.1.min.js', function() {
    jq = jQuery.noConflict()
    
    jq.get('https://usma.blackboard.com/learn/api/v1/users/me', function(r) {
        var url = "https://chat.it105.army/launch?new_win=true&lis_person_name_full=" + r.userName;
        
        if (jq('iframe').length == 0) {
            jq('#insecure_chat').html("<iframe width=100% height=325px src='"+url+"'></iframe>");
        } else { 
            var doc = jq('iframe')[0].contentDocument;
            jq('#insecure_chat',doc).html("<iframe width=100% height=325px src='"+url+"'></iframe>");
        }
    })
});