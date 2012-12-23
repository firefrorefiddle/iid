//$("#ministat").append(draw_bar(34, 37, 32));

test_stat = Array(3);
test_stat[0]=[10, 42, 0];
test_stat[1]=[10, 37, 0];
test_stat[2]=[13, 34, 0];
test_stat[3]=[12, 23, 17];

draw_statistic("#ministat", 80, 200, test_stat);

function draw_bar(fix, varbl, plan, scale)
{
    retval = $("<div class='bar'>");

    retval.append($("<div class='bar-plan' style='height:"+Math.round(plan*scale)+"px' alt='geplant'>"));
    retval.append($("<div class='bar-var' style='height:"+Math.round(varbl*scale)+"px' alt='ausgegebene Variable Kosten'>"));
    retval.append($("<div class='bar-fix' style='height:"+Math.round(fix*scale)+"px' alt='ausgegebene Fixkosten'>"));
    
    return retval;
}

function draw_statistic(div, width, height, stat)
{
    div = $(div);
    // horizontal scale factor calculation
    wscale = width * 1.0 / stat.length;

    // find max height for vertical scale factor calc
    maxH = 0;
    for(i=0;i<stat.length;i++)
    {
	h = stat[i][0]+stat[i][1]+stat[i][2];
	if(h > maxH)
	    maxH = h;
    }
    hscale = height * 1.0 / maxH;

    // draw the bars
    for(i=0;i<stat.length;i++)
    {
	b = draw_bar(stat[i][0], stat[i][1], stat[i][2], hscale);
    	b.css("position", "relative");
    	b.css("left", Math.round(i*wscale));
    	b.css("bottom", 0);
	h = Math.round((stat[i][0]+stat[i][1]+stat[i][2])*hscale);
    	b.css("top", height-h);
	b.css("height", height);
	b.css("width", wscale);
	div.append(b);
    }
}
