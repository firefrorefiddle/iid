
function init_table(topElemName, name)
{
    document.getElementById(topElemName).innerHTML = table_basic_layout(name).html();
}

function validate_input(datum, waehrung, betrag, beschreibung, kategorie, person)
{

    if(betrag == "") 
    {
	alert("Bitte geben Sie einen Betrag ein!");
	return false;
    }

    num = parseFloat(betrag);

    if(num <= 0 || isNaN(num))
    {
	alert(betrag + " ist keine positive Zahl!");
	return false;
    }

    return true;
}

function table_insert_row(name, 
			  datum, 
			  waehrung,
			  betrag, 
			  beschreibung, 
			  kategorie,
			  person)
{
    if(!validate_input(datum, waehrung, betrag, beschreibung, kategorie, person))
	return;

    newRow = $("\
<tr>\
  <td>"+datum+"</td>\
  <td>"+waehrung+"</td>\
  <td>"+parseFloat(betrag).toFixed(2)+"</td>\
  <td>"+beschreibung+"</td>\
  <td>"+kategorie+"</td>\
  <td>"+person+"</td>\
  <td><input type='button' value='Bearbeiten'></td>\
  <td><input type='button' value='Löschen'></td>\
</tr>");
    
    $("#"+name+"-inputRow").before(newRow);
}

function check_submit(name, event)
{
    // thanks to stackoverflow question 29943
    if(event && event.keyCode == 13)
    {
	table_insert_from_input(name);
    }
}

function table_insert_from_input(name)
{
    table_insert_row(
	name,
	$("#"+name+"-add-date").val(),
        $("#"+name+"-add-waehrung").val(),
        $("#"+name+"-add-betrag").val(),
        $("#"+name+"-add-beschreibung").val(),
        $("#"+name+"-add-kategorie").val(),
        $("#"+name+"-add-person").val());

    $("#"+name+"-add-betrag").val("");
    $("#"+name+"-add-beschreibung").val("");
}

function table_basic_layout(name)
{

  // search box copied from
  // http://forrst.com/posts/Fancy_search_box_using_Bootstrap_2_0-dG0 

    return $("\
<div id='"+name+"-table' class='main-table'>\
<div class='container-fluid'>\
  <div class='row'>\
    <div class='span1'>"+name+":\</div>\
    <div class='span5'>EUR 0,00</div>\
    <div class='span2'>\
      <div class='input-append'>\
        <input placeholder='Search...'>\
        <button class='btn add-on'>\
          <i class='icon-search'></i>\
        </button>\
      </div>\
    </div> <!-- span2 -->\
  </div>   <!-- row -->\
</div>     <!-- search box container -->\
<table class='table table-condensed table-striped table-bordered'>\
<tr>\
  <th>Datum</th>\
  <th>Währung</th>\
  <th>Betrag</th>\
  <th>Beschreibung</th>\
  <th>Kategorie</th>\
  <th>Person</th>\
  <th/><th/>\
</tr>\
<tr id='"+name+"-inputRow'  onKeyPress='JavaScript:check_submit(\""+name+"\", event);'>\
  <form>\
    <td>\
      <div class='input-append date' id='dp3' data-date='12-02-2012' data-date-format='dd-mm-yyyy'>\
        <input class='span2' id='"+name+"-add-date' size='16' type='text' value='12-02-2012' readonly>\
        <span class='add-on'><i class='icon-calendar'></i></span>\
      </div>\
    </td>\
    <td>\
      <select name='sel' class='span1' id='"+name+"-add-waehrung'>\
        <option value='EUR'>EUR</option>\
        <option value='USD'>USD</option>\
        <option value='GBP'>GBP</option>\
        <option value='CAD'>CAD</option>\
      </select>\
    </td>\
    <td>\
      <input type='text' class='span1' id='"+name+"-add-betrag'></input>\
    </td>\
    <td>\
      <input type='text' class='span1' id='"+name+"-add-beschreibung'></input>\
    </td>\
    <td>\
      <select name='sel' class='span1' id='"+name+"-add-kategorie'>\
        <option value='Miete'>Miete</option>\
        <option value='Wohnen'>Wohnen</option>\
      </select>\
    </td>\
    <td>\
      <select name='sel' class='span1' id='"+name+"-add-person'>\
        <option value='ich'>ich</option>\
        <option value='Selena'>Selena</option>\
      </select>\
    </td>\
    <td/><td><input type='submit' value='Hinzufügen' \
             onClick='JavaScript:table_insert_from_input(\""+name+"\");'></td>\
  </form>\
</tr>\
</table>\
</div>");
}
