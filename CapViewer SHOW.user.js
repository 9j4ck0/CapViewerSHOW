// ==UserScript==
// @name         CapViewer SHOW
// @namespace    http//tampermonkey.net/
// @version      0.1.0
// @description  Gestione user friendly della web app CapViewer
// @author       9j3thr0
// @match        https://capviewer.vigilfuoco.it/cap-viewer-web/alerts/*
// @match        https://capviewer.vigilfuoco.it/cap-viewer-web/alerts
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll(".row").forEach(d => {
        d.style.marginLeft = '0px';
        d.style.marginRight = '0px';
    });
    document.querySelector(".row.header").remove();
    document.querySelector('.row.header-menu').style.margin = '0px';
    var b = document.createElement('img');
    b.setAttribute('src', 'https://capviewer.vigilfuoco.it/cap-viewer-web/static/img/header.gif');
    b.style.maxHeight = '2em';
    b.style.paddingRight = '1em';
    document.querySelector(".col-md-7").appendChild(b);
    document.querySelectorAll('.nav.navbar-nav>li').forEach(v => {
        var nElem = document.createElement('div');
        var txtElem = document.createElement('span');
        txtElem.style.padding = '0em 0.5em';
        var a = document.querySelectorAll('.navbar.navbar-header>.label.label-warning');
        if(v.id == 'switchPsap') {
            a = a[1];
            b = document.createElement('select');
            b.setAttribute('name', 'cambiaSede');
            b.setAttribute('id', 'cambiaSede');
            b.setAttribute('class', 'label label-warning');
            b.style.lineHeight = '2';
            b.style.height = '2em';
            b.style.border = '0px';
            b.style.borderRadius = '5px';
            b.style.marginRight = '2em';
            b.addEventListener('change',function(value) {
                if(value.target.value != '') {
                    window.location = value.target.value;
                }
            }, false);
            var firstOption = document.createElement('option');
            firstOption.innerText = a.innerText.trim();
            firstOption.setAttribute('selected', 'selected');
            b.appendChild(firstOption)
            document.querySelectorAll('.nav.navbar-nav>li>ul>li').forEach(v => {
                if(v.id != '') {
                    var optionNext;
                    Array.from(v.children).forEach(x => {
                        optionNext = document.createElement('option');
                        optionNext.innerText = x.innerText;
                        optionNext.setAttribute('value', x.href);
                        b.appendChild(optionNext);
                    })
                }
            });
            nElem.setAttribute('class', 'col-md-3');
            nElem.style.textAlign = 'center';
            txtElem.innerText = 'Sala Operativa';
            nElem.appendChild(txtElem);
            nElem.appendChild(b);
            b.style.marginTop = '0.2em';
            document.getElementsByClassName('row header-menu')[0].appendChild(nElem);
        }
        else {
            b = document.createElement('button');
            b.setAttribute('id', v.id);
            console.log(v.children[0].getAttribute('href'));
            b.onclick = function(){
                location.href = v.children[0].getAttribute('href');
                return false;
            };
            b.style.borderRadius = '5px';
            b.style.border = '0px';
            if(v.id == 'profilo') {
                a = a[0];
                b.innerText = a.innerText.trim();
                b.setAttribute('class', 'label label-warning');
                b.style.lineHeight = '2';
                b.style.padding = '0em 2em';
                nElem.setAttribute('class', 'col-md-2');
                nElem.style.textAlign = 'center';
                txtElem.innerText = 'Benvenuto';
                nElem.appendChild(document.querySelector('.glyphicon.glyphicon-user'));
                nElem.appendChild(txtElem);
                nElem.appendChild(b);
                b.style.marginTop = '0.2em';
                document.getElementsByClassName('row header-menu')[0].appendChild(nElem);
            }
            else {
                b.innerText = v.innerText.trim();
                b.style.marginRight = '1em';
                if(v.className == 'active') {
                    b.style.backgroundColor = '#f0ad4e';
                }
                else {
                    b.style.backgroundColor = '#ab201d';
                }
                b.addEventListener("mouseenter", function( event ) {
                    event.target.style.backgroundColor = "";
                    event.target.style.color = 'black';
                }, false);
                b.addEventListener("mouseleave", function( event ) {
                    if(v.className == 'active') {
                        event.target.style.backgroundColor = '#f0ad4e';
                    }
                    else {
                        event.target.style.backgroundColor = '#ab201d';
                    }
                    event.target.style.color = '#fff';
                }, false);
                if(b.innerText == 'ESCI') {
                    b.addEventListener('click', function(event) {
                        if(confirm('Verrai disconnesso solo dal login di capviewer non dall\'SSO perchè è ancora in fase beta') == true) {
                            window.location = 'https://capviewer.vigilfuoco.it/cap-viewer-web/logout';
                        }
                    })
                    nElem.setAttribute('class', 'col-md-1');
                    nElem.style.textAlign = 'center';
                    nElem.appendChild(b);
                    b.style.marginTop = '0.2em';
                    document.getElementsByClassName('row header-menu')[0].appendChild(nElem);
                }
                else {
                    b.style.marginTop = '0.1em';
                    document.querySelector(".col-md-7").appendChild(b);
                }
            }
        }
    });
//     rimuovo la barra vecchia con nome e sala operativa
    document.querySelector(".col-md-5").remove();
//     modifico le proporzioni della barra di header
    document.querySelector(".col-md-7").classList.replace('col-md-7', 'col-md-6');
    document.querySelectorAll(".row")[1].remove();
    if(document.querySelector("#map-global") != undefined) {
        var e = document.querySelector("#map-global");
        e.style.height = '95vh';
        e.style.marginTop = '0.5em';
        document.querySelector(".col-lg-8").style.paddingRight = '0.5em';
    }
    document.getElementById('tipoCodifica_chosen').style.width = '';
    document.getElementById('event_chosen').style.width = '';
    document.getElementById('senders_chosen').style.width = '';
    document.getElementById('inc_prog_chosen').style.width = '';
    document.getElementById('rilevanza_chosen').style.width = '';
    document.getElementById('filtroIntervento_chosen').style.width = '';
    document.querySelector(".col-lg-4").style.paddingRight = '0em';
    document.querySelector("div.left-column").style.margin = '0.3em 0em';
    var numberFilter = document.createElement('div');
    numberFilter.setAttribute('class', 'col-md-3 form-title');
    numberFilter.innerText = 'Dati Filtrati: ' + document.querySelector('.list-results-header>b').innerText;
    var detail = document.createElement('div');
    detail.setAttribute('class', 'col-md-8');
    detail.innerText = 'Dal: ' + document.querySelector('#filtraDal').value;
    if(document.querySelector('#filtraAl').value != '') {
        detail.innerText = detail.innerText + ' Al: ' + document.querySelector('#filtraAl').value;
    }
    if(document.querySelector('#numero').value != '') {
        detail.innerText = detail.innerText + ' Numero: ' + document.querySelector('#numero').value;
    }
    var buttonDIV = document.createElement('div');
    buttonDIV.setAttribute('class', 'col-md-1');
    var button = document.createElement('button');
    button.style.border = '0px';
    button.backgroundColor = 'transparent';
    var svgItem = document.createElement('svg');
    svgItem.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgItem.setAttribute('width', '16');
    svgItem.setAttribute('height', '16');
    svgItem.setAttribute('fill', 'currentColor');
    svgItem.setAttribute('class', 'bi bi-caret-down');
    svgItem.setAttribute('viewBox', '0 0 16 16');
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    svg.setAttribute('d', 'M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z');
    svgItem.appendChild(svg);
    button.appendChild(svgItem);
    // button.innerText = 'OPEN';
    buttonDIV.appendChild(button);
    var filterHidden = document.createElement('div');
    filterHidden.setAttribute('id', 'filterBar');
    filterHidden.appendChild(numberFilter);
    filterHidden.appendChild(detail);
    filterHidden.appendChild(buttonDIV);
    document.querySelector("div.left-column").insertBefore(filterHidden, document.querySelector("div.left-column").firstChild);
    document.querySelector('.list-results-header').remove();
    console.log('CAPVIEWER_tool...ok! developer by 9J3thr0');
})();