 /*Global Variable Declarations*/
var thisUserAccount;
var listautonum = "AutoGenerate";
var nextnumber;
var docnum;
var _varauto;
    
NWF$(document).ready(function() {
	debugger;
	 /*To retrieve the current user value*/
    thisUserAccount = NWF$().SPServices.SPGetCurrentUser({
        fieldName: "Title",
        debug: false
    });
    if (Author == '') {
        NWF$('div.nf-Author').find('table.ms-usereditor').find('div.ms-inputuserfield').append(thisUserAccount);
        NWF$(NWF$('div.nf-Author').find('table.ms-usereditor').find('img')[0]).addClass('PeoplePicker');
        NWF$(".PeoplePicker").trigger("click");
    }
    /*call the update doc num function on save button click*/
    NWF$('.save').click(function() {
if(IsNewMode){
        updatedocnum();
		}
    });
/*Generate the Drawing number automatically*/
if(IsNewMode){

    docnum = getdocnum();
    _varauto = "PL -" + docnum;
    NWF$("#" + varRefNum).val(_varauto);
    docnum = Number(docnum) + 1;
	NWF$(".docnumlbl").text(_varauto);
	
}
else
{

NWF$(".docnumlbl").text(autonumtxt);
}

});
 /*Function to retrieve the next number from the Auto generate list*/
function getdocnum() {
        NWF$().SPServices({
            operation: "GetListItems",
            async: false,
            listName: listautonum,
            CAMLRowLimit: 1,
            completefunc: function(xData, Status) {
                NWF$(xData.responseXML).SPFilterNode("z:row").each(function() {
                    nextnumber = NWF$(this).attr("ows_NextNumber");
				});
			}
		});
        return nextnumber;
    }
    /*Update the Next number in the Auto generate list*/
function updatedocnum() {
    NWF$().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "Update",
        listName: listautonum,
        ID: 1,
        valuepairs: [
            ["NextNumber", docnum]
        ],
        completefunc: function(xData, Status) {
            
        }

    });
}
