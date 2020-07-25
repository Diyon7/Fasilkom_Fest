function hanyaAngka(variable_0) {
    var variable_1 = (variable_0["which"]) ? variable_0["which"] : event["keyCode"];
    if (variable_1 == 34) {
    	variable_0.preventDefault();
        return false
    };
    return true
}
$(document)["ready"](function() {
    $(".validate")["keypress"](function(variable_2) {
        return hanyaAngka(variable_2)
    })
})