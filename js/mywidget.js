$.widget("ui.datepicker2", {
    _init: function () {
        var $el = this.element;
        $el.datepicker(this.options);

        if (this.options && this.options.checkDate) {
            $el.on("keydown", function (e) {
                var curDate = $el.val();
                $el.attr("oldValue", curDate);
                return true;
            });
            $el.on("keyup", function (e) {
                var curDate = $el.val();
                try {
                    var r = $.datepicker.parseDate("dd-M-yy", curDate);
                } catch (ex) {
                    alert('Not VALID!');
                    $el.val($el.attr("oldValue"));
                    $el.focus();
                }
            });
        }

           $el.on("generateMonthYearHeader", function (inst, drawMonth, drawYear, minDate, maxDate,
                                                secondary, monthNames, monthNamesShort) {

                var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
                    changeMonth = this._get(inst, "changeMonth"),
                    changeYear = this._get(inst, "changeYear"),
                    showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
                    html = "<div class='ui-datepicker-title'>",
                    monthHtml = "";

                // Month selection
                if (secondary || !changeMonth) {
                    monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
                } else {
                    inMinYear = (minDate && minDate.getFullYear() === drawYear);
                    inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
                    monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                    for (month = 0; month < 12; month++) {
                        if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                            monthHtml += "<option value='" + month + "'" +
                                (month === drawMonth ? " selected='selected'" : "") +
                                ">" + monthNamesShort[month] + "</option>";
                        }
                    }
                    monthHtml += "</select>";
                }

                if (!showMonthAfterYear) {
                    html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
                }

                // Year selection
                if (!inst.yearshtml) {
                    inst.yearshtml = "";
                    if (secondary || !changeYear) {
                        html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
                    } else {

                        // determine range of years to display
                        years = this._get(inst, "yearRange").split(":");
                        thisYear = new Date().getFullYear();
                        determineYear = function (value) {
                            var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :
                                (value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :
                                    parseInt(value, 10)));
                            return (isNaN(year) ? thisYear : year);
                        };
                        year = determineYear(years[0]);
                        endYear = Math.max(year, determineYear(years[1] || ""));
                        year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                        endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                        // inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                        // for ( ; year <= endYear; year++ ) {
                        // 	inst.yearshtml += "<option value='" + year + "'" +
                        // 		( year === drawYear ? " selected='selected'" : "" ) +
                        // 		">" + year + "</option>";
                        // }

                        // newly added
                        inst.yearshtml += "<div class='dropdown ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                        inst.yearshtml += "<button class=\"btn btn-default dropdown-toggle dropright\" type=\"button\" data-toggle=\"dropdown\">Year\n" +
                            "    <span class=\"caret\"></span></button>\n" +
                            "    <ul class=\"dropdown-menu year-menu\">\n" +
                            "      <li><a tabindex=\"-1\" href=\"#\">1990</a></li>\n" +
                            "      <li><a tabindex=\"-1\" href=\"#\">2000</a></li>\n" +
                            "      <li class=\"dropdown-submenu year-submenu\">\n" +
                            "        <a class=\"test\" tabindex=\"-1\" href=\"#\">2010<span class=\"caret\"></span></a>\n" +
                            "        <ul class=\"dropdown-menu year-menu\">\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2010</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2011</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2012</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2013</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2014</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2015</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2016</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2017</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2018</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2019</a></li>\n" +
                            "        </ul>\n" +
                            "      </li>\n" +
                            "    </ul>\n" +
                            "  </div>";

                        // newly added

                        // inst.yearshtml += "</select>";

                        html += inst.yearshtml;
                        inst.yearshtml = null;
                    }
                }

                html += this._get(inst, "yearSuffix");
                if (showMonthAfterYear) {
                    html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
                }
                html += "</div>"; // Close datepicker_header
                return html;
            }
           )}} )


$.widget("ui.singledatepicker", {
    _create: function(){
        this.element.datepicker($.extend(this.options, {
            _enableDatepicker: function (target) {
                var nodeName, inline,
                    $target = $(target),
                    inst = $.data(target, "datepicker");

                if (!$target.hasClass(this.markerClassName)) {
                    return;
                }

                nodeName = target.nodeName.toLowerCase();
                if (nodeName === "input") {
                    target.disabled = false;
                    inst.trigger.filter("button").each(function () {
                        this.disabled = false;
                    }).end().filter("img").css({opacity: "1.0", cursor: ""});
                } else if (nodeName === "div" || nodeName === "span") {
                    inline = $target.children("." + this._inlineClass);
                    inline.children().removeClass("ui-state-disabled");
                    inline.find("select.ui-datepicker-month, div.ui-datepicker-year").prop("disabled", false);
                }
                this._disabledInputs = $.map(this._disabledInputs,
                    function (value) {
                        return (value === target ? null : value);
                    }); // delete entry
            },

            _disableDatepicker: function (target) {
                var nodeName, inline,
                    $target = $(target),
                    inst = $.data(target, "datepicker");

                if (!$target.hasClass(this.markerClassName)) {
                    return;
                }

                nodeName = target.nodeName.toLowerCase();
                if (nodeName === "input") {
                    target.disabled = true;
                    inst.trigger.filter("button").each(function () {
                        this.disabled = true;
                    }).end().filter("img").css({opacity: "0.5", cursor: "default"});
                } else if (nodeName === "div" || nodeName === "span") {
                    inline = $target.children("." + this._inlineClass);
                    inline.children().addClass("ui-state-disabled");
                    inline.find("select.ui-datepicker-month, div.ui-datepicker-year").prop("disabled", true);
                }
                this._disabledInputs = $.map(this._disabledInputs,
                    function (value) {
                        return (value === target ? null : value);
                    }); // delete entry
                this._disabledInputs[this._disabledInputs.length] = target;
            },

            /* Generate the date picker content. */
            _updateDatepicker: function (inst) {
                this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
                datepicker_instActive = inst; // for delegate hover events
                inst.dpDiv.empty().append(this._generateHTML(inst));
                this._attachHandlers(inst);

                var origyearshtml,
                    numMonths = this._getNumberOfMonths(inst),
                    cols = numMonths[1],
                    width = 17,
                    activeCell = inst.dpDiv.find("." + this._dayOverClass + " a");

                if (activeCell.length > 0) {
                    datepicker_handleMouseover.apply(activeCell.get(0));
                }

                inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
                if (cols > 1) {
                    inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em");
                }
                inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") +
                "Class"]("ui-datepicker-multi");
                inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") +
                "Class"]("ui-datepicker-rtl");

                if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst)) {
                    inst.input.trigger("focus");
                }

                // Deffered render of the years select (to avoid flashes on Firefox)
                if (inst.yearshtml) {
                    origyearshtml = inst.yearshtml;
                    setTimeout(function () {

                        //assure that inst.yearshtml didn't change.
                        if (origyearshtml === inst.yearshtml && inst.yearshtml) {
                            inst.dpDiv.find("div.ui-datepicker-year:first").replaceWith(inst.yearshtml);
                        }
                        origyearshtml = inst.yearshtml = null;
                    }, 0);
                }
            },


            _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate,
                                                secondary, monthNames, monthNamesShort) {

                var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
                    changeMonth = this._get(inst, "changeMonth"),
                    changeYear = this._get(inst, "changeYear"),
                    showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
                    html = "<div class='ui-datepicker-title'>",
                    monthHtml = "";

                // Month selection
                if (secondary || !changeMonth) {
                    monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
                } else {
                    inMinYear = (minDate && minDate.getFullYear() === drawYear);
                    inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
                    monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                    for (month = 0; month < 12; month++) {
                        if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                            monthHtml += "<option value='" + month + "'" +
                                (month === drawMonth ? " selected='selected'" : "") +
                                ">" + monthNamesShort[month] + "</option>";
                        }
                    }
                    monthHtml += "</select>";
                }

                if (!showMonthAfterYear) {
                    html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
                }

                // Year selection
                if (!inst.yearshtml) {
                    inst.yearshtml = "";
                    if (secondary || !changeYear) {
                        html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
                    } else {

                        // determine range of years to display
                        years = this._get(inst, "yearRange").split(":");
                        thisYear = new Date().getFullYear();
                        determineYear = function (value) {
                            var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :
                                (value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :
                                    parseInt(value, 10)));
                            return (isNaN(year) ? thisYear : year);
                        };
                        year = determineYear(years[0]);
                        endYear = Math.max(year, determineYear(years[1] || ""));
                        year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                        endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                        // inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                        // for ( ; year <= endYear; year++ ) {
                        // 	inst.yearshtml += "<option value='" + year + "'" +
                        // 		( year === drawYear ? " selected='selected'" : "" ) +
                        // 		">" + year + "</option>";
                        // }

                        // newly added
                        inst.yearshtml += "<div class='dropdown ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                        inst.yearshtml += "<button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Year\n" +
                            "    <span class=\"caret\"></span></button>\n" +
                            "    <ul class=\"dropdown-menu year-menu\">\n" +
                            "      <li><a tabindex=\"-1\" href=\"#\">1990</a></li>\n" +
                            "      <li><a tabindex=\"-1\" href=\"#\">2000</a></li>\n" +
                            "      <li class=\"dropdown-submenu year-submenu\">\n" +
                            "        <a class=\"test\" tabindex=\"-1\" href=\"#\">2010<span class=\"caret\"></span></a>\n" +
                            "        <ul class=\"dropdown-menu year-menu\">\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2010</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2011</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2012</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2013</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2014</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2015</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2016</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2017</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2018</a></li>\n" +
                            "          <li><a tabindex=\"-1\" href=\"#\">2019</a></li>\n" +
                            "        </ul>\n" +
                            "      </li>\n" +
                            "    </ul>\n" +
                            "  </div>";

                        // newly added

                        // inst.yearshtml += "</select>";

                        html += inst.yearshtml;
                        inst.yearshtml = null;
                    }
                }

                html += this._get(inst, "yearSuffix");
                if (showMonthAfterYear) {
                    html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
                }
                html += "</div>"; // Close datepicker_header
                return html;
            }
        } ))
}});

// $.widget("ui.singledatepicker", {
//     _create: function(){
//         this.element.datepicker();
//         $(".ui-datepicker-title").remove();
//         $(".ui-datepicker-title").html(
//                         // newly added
//             "<div class='dropdown ui-datepicker-year' data-handler='selectYear' data-event='change'>\n" +
//             "<button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Year\n" +
//                 "    <span class=\"caret\"></span></button>\n" +
//                 "    <ul class=\"dropdown-menu year-menu\">\n" +
//                 "      <li><a tabindex=\"-1\" href=\"#\">1990</a></li>\n" +
//                 "      <li><a tabindex=\"-1\" href=\"#\">2000</a></li>\n" +
//                 "      <li class=\"dropdown-submenu year-submenu\">\n" +
//                 "        <a class=\"test\" tabindex=\"-1\" href=\"#\">2010<span class=\"caret\"></span></a>\n" +
//                 "        <ul class=\"dropdown-menu year-menu\">\n" +
//                 "          <li><a tabindex=\"-1\" href=\"#\">2010</a></li>\n" +
//                 "          <li><a tabindex=\"-1\" href=\"#\">2011</a></li>\n" +
//                 "          <li><a tabindex=\"-1\" href=\"#\">2012</a></li>\n" +
//                 "          <li><a tabindex=\"-1\" href=\"#\">2013</a></li>\n" +
//                 "          <li><a tabindex=\"-1\" href=\"#\">2014</a></li>\n" +
//                 "          <li><a tabindex=\"-1\" href=\"#\">2015</a></li>\n" +
//                 "          <li><a tabindex=\"-1\" href=\"#\">2016</a></li>\n" +
//                 "          <li><a tabindex=\"-1\" href=\"#\">2017</a></li>\n" +
//                 "          <li><a tabindex=\"-1\" href=\"#\">2018</a></li>\n" +
//                 "          <li><a tabindex=\"-1\" href=\"#\">2019</a></li>\n" +
//                 "        </ul>\n" +
//                 "      </li>\n" +
//                 "    </ul>\n" +
//                 "  </div>"
//         );
//                         // newly added
//     }
// });
