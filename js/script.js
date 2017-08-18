const CONTENT_KEYS=["about", "projects", "experience"];
const TAGS = [
    "NodeJS",
    "Java",
    "Python",
    "Meteor",
    "Android",
    "R",
    "MongoDB",
    "MySQL",
    "Machine Learning",
];
const TAGS_COUNT = {
    "NodeJS": 2,
    "Java": 3,
    "Python": 1,
    "Meteor": 1,
    "Android": 1,
    "R": 2,
    "MongoDB": 1,
    "MySQL": 2,
    "Machine Learning": 2, 
}
const PROJECTS = [
    {
        id: 6,
        title: "IOU",
        tags: ["NodeJS", "Meteor", "MongoDB"],
        description: "[In Progress] A web application simplifying the process for collecting money from friends using the PayPal API.",
    },
    {
        id: 5,
        title: "NHL Prediction Model",
        tags: ["R", "Machine Learning"],
        description: "A model for predicting various aspects of NHL games. Used the perceptron machine learning algorithm to create a model to predict which teams will make the playoffs based on input factors of various season stats. Also created regression models for (A) evaluating players based on a single number metric, aggregating contributions on a game by game basis; and (B) predicting fantasy hockey points based on recent stats.",
    },
    {
        id: 4,
        title: "Group Tools Chatbot",
        tags: ["NodeJS"],
        description: "A Facebook messenger chatbot to add several tools for group chats. Tools were a gold star tracker, list randomizer and selector, and reaction picture library.",
    },
    {
        id: 3,
        title: "Support and Resistance Line Generator",
        tags: ["R"],
        description: "A platform to determine and plot support and resistance lines based on stock charts.",
    },
    {
        id: 2,
        title: "BikeSafe for V2V",
        tags: ["Java", "Python", "Android"],
        description: "A smartwatch app to detect cyclists' hand signals for the purpose of demoing a system to allow cyclists to integrate into vehicle to vehicle communication protocols of the future.",
    },
    {
        id: 1,
        title: "Smart Bed Monitoring System",
        tags: ["Java", "MySQL", "Machine Learning"],
        description: "A machine learning based system for detecting bed-related scenarios and monitoring sleep patterns and sending alerts for certain situations. Used simple, non-intrusive piezoelectric force sensors transmitting readings via ZigBee nodes in real time. Stored historical data in a MySQL database for use in trending health history.",
    },
    {
        id: 0,
        title: "RFID Object Locator",
        tags: ["Java", "MySQL"],
        description: "A system for locating items with RFID tags attached to them using an RFID scanner. Tracked item-tag pairings in a MySQL database to allow for only specific items selected in JavaFX frontend to be tracked.",
    },
]
const EXPERIENCE = [
     {
        key: "magnet",
        company: "Magnet Forensics",
        position: "Software Developer Co-op",
        location: "Waterloo, ON, Canada",
        date: "May 2017-Aug 2017",
        description: "Full-stack development of metric dashboard aggregating testing data from various sources. Used React.JS/Redux for the frontend UI connected to a C# REST API endpoints to access a MySQL database." +
            "<ul><li>Created dashboard page for viewing results of automated regression tests using Jenkins API.</li><li>Added ability to mark certain automated test runs as outliers and a view to display metric deltas between runs.</li>" +
            "<li>Designed and implemented view to show health of product features over a history of code changes.</li><li>Integrated dashboard with Jira API to track expected hit counts to ease process of maintaining a golden baseline.</li>" +
            "<li>Created widget to display status of installer and expect new files into the known installer files.</li></ul>" +
            "Winforms FlexNet Licensing Tool Development." +
            "<ul><li>Multithreaded requests to FlexNet API to create a more robust process for pulling data.</li><li>Designed and implemented previewing functionality to display a customer's existing licenses, improving license renewal and removal process.</li></ul>",
        logoSource: "resources/exp-magnet.png"
    },
    {
        key: "cbs",
        company: "Cambridge Brain Sciences",
        position: "Student Developer",
        location: "London, ON, Canada",
        date: "Jan 2017-May 2017",
        description: "Modernized suite of brain games used for cognitive tests." + 
            "<ul><li>Ported games from flash player to HTML5 and JS.</li><li>Developed model for standardizing scores of old tests so that past data remained relevant and comparable to new results.</li>" +
            "<li>Built automated test suite in Ruby/Rails using RSpec and contributed to behaviour testing of modern version of games, ensuring behaviour replicated old version.</li></ul>",
        logoSource: "resources/exp-cbs.png"
    },
    {
        key: "uwo",
        company: "Western University ECE Research Group",
        position: "Undergraduate Researcher",
        location: "London, ON, Canada",
        date: "Nov 2015-Aug 2016",
        description: "Research and development in the field of communications/computing technologies and associated applications" +
            "<ul><li>Designed a novel indoor locationing technique based on WiFi signal strength propagation. Developed model for propagation and prototyped system using Android. (Publication: <a href=\"#\">A novel Wifi-based indoor localization system - IEEE CSCWD 2017</a>).</li>" +
            "<li>Researched methods of improving human activity recognition apps through machine learning methods. (Publication: <a href=\"http://ieeexplore.ieee.org/document/7844783/\">Mitigating sensor differences for phone-based human activity recognition</a>).</li></ul>",
        logoSource: "resources/exp-uwo.png"
    },
]
const WIDTH_THRESHOLD = 1000;
const HEIGHT_THRESHOLD = 500;

var currentActive = "home";
var selectedTags = TAGS;
var searchKey = "";
var size = "";

$(document).ready(function() {
    $( '#projects-tag-filter, #sm-projects-tag-filter' ).on( 'click', function( event ) {
        var tag;
        if(event.target.className==="badge" || event.target.className.includes("fa-")){
            tag = event.target.parentElement;
        } else {
            tag = event.target;
        }
        if(tag.innerText==="Select All"){
            changeAllCheck(true);
        } else if(tag.innerText==="Select None"){
            changeAllCheck(false);
        } else if(tag.className!=="divider"){
            tag = tag.childNodes[1].nodeValue.trim();
            changeCheck(tag);    
        }
        event.stopPropagation();
    });

    $(window).on('resize', function(){
        var win = $(this); 
        var width = $(window).width();
        var height = $(window).height();
        if(width<WIDTH_THRESHOLD || height<HEIGHT_THRESHOLD){
            resizeSmall();
        } else {
            resizeBig();
        }
  });
});

$( window ).on( "load", function() {
    init();
    var width = $(window).width();
    var height = $(window).height();
    if(width<WIDTH_THRESHOLD || height<HEIGHT_THRESHOLD){
        initSmall();
    } else {
        initBig();
    }
});

function changeAllCheck(checked){
    for(var i=0;i<TAGS.length;i++){
        var tagCheck = document.getElementById(TAGS[i]+"-check");
        tagCheck.className = "fa fa-" + (checked ? "check-" : "") + "square-o";
        var smallTagCheck = document.getElementById("sm-" + TAGS[i] +"-check");
        smallTagCheck.className = "fa fa-" + (checked ? "check-" : "") + "square-o";
    }
    
    changeSelectedTags();
}
    
function changeCheck(tag){
    var tagCheck = document.getElementById(tag+"-check");
    tagCheck.className = "fa fa-" + (tagCheck.className.includes("check") ? "" : "check-") + "square-o";
    var smallTagCheck = document.getElementById("sm-" + tag +"-check");
    smallTagCheck.className = "fa fa-" + (smallTagCheck.className.includes("check") ? "" : "check-") + "square-o";
    changeSelectedTags();
}

function changeContent(newActive){
    if(currentActive !== "home" && size==="lg"){
        var panel = document.getElementById("content-panel-"+currentActive);
        var panelWidth = panel.offsetWidth;

        var newContentPanel = document.getElementById("content-panel-"+newActive);
        newContentPanel.style.width = panelWidth;
    }
    
    var oldContentDiv = document.getElementById("content-div-" + currentActive);
    var newContentDiv = document.getElementById("content-div-" + newActive);
    if(oldContentDiv && !oldContentDiv.className.includes("hidden")){
        oldContentDiv.className = oldContentDiv.className + " hidden";
    }
    if(newContentDiv.className.includes("hidden")){
        newContentDiv.className = newContentDiv.className.replace("hidden", "");
        var leftSidebar = document.getElementById("left-sidebar");
        leftSidebar.className = leftSidebar.className.replace("col-md-offset-3", "");
        var rightSidebar = document.getElementById("right-sidebar");
        rightSidebar.className = rightSidebar.className.replace("col-md-offset-6", "col-md-offset-9");
    } 

    oldContentDiv = document.getElementById("sm-content-div-" + currentActive);
    newContentDiv = document.getElementById("sm-content-div-" + newActive);
    if(oldContentDiv && !oldContentDiv.className.includes("hidden")){
        oldContentDiv.className = oldContentDiv.className + " hidden";
    }
    if(newContentDiv.className.includes("hidden")){
        newContentDiv.className = newContentDiv.className.replace("hidden", "");
    }
    
    currentActive=newActive;
}

function changePanels(filteredProjects){
    var panels = filteredProjects.map(function(p) {
        var out = "<div class=\"panel panel-default\" id=\"project-" + p.id + "-panel\"><div class=\"panel-heading\" onmouseover=\"expandProject(" + p.id + ")\">" + p.title + "</div><div class=\"panel-body\">";
        for(var i=0;i<p.tags.length;i++){
            out += "  <span class=\"label label-default\">" + p.tags[i] + "</span>";
        }
        out += "<div class=\"collapse\" id=\"project-" + p.id + "-collapse\"><br/>" + p.description + "</div></div></div>";
        return out;
    });

    var projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = panels.join(" ");

    panels = filteredProjects.map(function(p) {
        var out = "<div class=\"panel panel-default\" id=\"sm-project-" + p.id + "-panel\"><div class=\"panel-heading\" onmouseover=\"expandProject(" + p.id + ")\">" + p.title + "</div><div class=\"panel-body\">";
        for(var i=0;i<p.tags.length;i++){
            out += "  <span class=\"label label-default\">" + p.tags[i] + "</span>";
        }
        out += "<div class=\"collapse\" id=\"sm-project-" + p.id + "-collapse\"><br/>" + p.description + "</div></div></div>";
        return out;
    });

    var smallProjectsContainer = document.getElementById('sm-projects-container');
    smallProjectsContainer.innerHTML = panels.join(" ");
}

function changeSelectedTags(){
    selectedTags = [];
    for(var i=0;i<TAGS.length;i++){
        var tagCheck = document.getElementById(TAGS[i]+"-check");
        if(tagCheck.className.includes("check")){
            selectedTags.push(TAGS[i]);
        }
    }
    updateTagsFilter();
    filterProjects();
}

function changeWells(experience){
    var thumbs = experience.map(function(e){
        return "<td class=\"text-center\"><a onmouseover=\"expandExperience('" + e.key +
            "')\"><img src=\"" + e.logoSource + 
            "\" id=\"" + e.key +
            "-thumb\" class=\"img-small img-thumbnail img-responsive\"></a></td>";
    });

    var thumbnailContainer = document.getElementById("experience-thumbs");
    thumbnailContainer.innerHTML = thumbs.join(" ");

    var thumbs = experience.map(function(e){
        return "<td class=\"text-center\"><a onmouseover=\"expandExperience('" + e.key +
            "')\"><img src=\"" + e.logoSource + 
            "\" id=\"sm-" + e.key +
            "-thumb\" class=\"img-small img-thumbnail img-responsive\"></a></td>";
    });

    thumbnailContainer = document.getElementById("sm-experience-thumbs");
    thumbnailContainer.innerHTML = thumbs.join(" ");
    
    
    var divs = experience.map(function(e) {
        return "<div class=\"col-md-12 collapse\" id=\"" + e.key + 
            "-collapse\"><h4 class=\"text-center\">" + e.company + 
            "</h4><br/><i><table class=\"text-center\"><tr><td>" + e.position +
            "</td><td>" + e.location +
            "</td><td>" + e.date +
            "</td></tr></table></i><hr/><div class=\"well text-justify\">" + e.description +
            "</div></div>";
    });

    var experienceContainer = document.getElementById('experience-container');
    experienceContainer.innerHTML = divs.join(" ");

    divs = experience.map(function(e) {
        return "<div class=\"col-md-12 collapse\" id=\"sm-" + e.key + 
            "-collapse\"><h4 class=\"text-center\">" + e.company + 
            "</h4><br/><i><table class=\"text-center\"><tr><td>" + e.position +
            "</td></tr><tr><td>" + e.location +
            "</td></tr><tr><td>" + e.date +
            "</td></tr></table></i><hr/><div class=\"well text-justify\">" + e.description +
            "</div></div>";
    });

    var smallExperienceContainer = document.getElementById('sm-experience-container');
    smallExperienceContainer.innerHTML = divs.join(" ");
}

function expandExperience(key){
    for(var i=0;i<EXPERIENCE.length;i++){
        if(key!==EXPERIENCE[i].key){
            var thumb = document.getElementById(EXPERIENCE[i].key+"-thumb");
            thumb.className = thumb.className.replace("faded", "");
            var content = document.getElementById(EXPERIENCE[i].key+"-collapse");
            content.className = content.className.replace("in", "");
            var smallContent = document.getElementById("sm-" + EXPERIENCE[i].key+"-collapse");
            smallContent.className = smallContent.className.replace("in", "");
            
        } else {
            var thumb = document.getElementById(EXPERIENCE[i].key+"-thumb");
            thumb.className = thumb.className.includes("faded") ? thumb.className : thumb.className + " faded";
            var content = document.getElementById(EXPERIENCE[i].key+"-collapse");
            content.className = content.className.includes("in") ? content.className : content.className+" in";
            var smallContent = document.getElementById("sm-" + EXPERIENCE[i].key+"-collapse");
            smallContent.className = smallContent.className.includes("in") ? smallContent.className : smallContent.className+" in";
        }
    }
}

function expandProject(id){
    for(var i=0;i<PROJECTS.length;i++){
        if(id!==PROJECTS[i].id){
            var panel = document.getElementById("project-" + PROJECTS[i].id+"-panel");
            if(panel){
                panel.className = panel.className.replace("info", "default");                
            }
            var content = document.getElementById("project-" + PROJECTS[i].id+"-collapse");
            if(content){
                content.className = content.className.replace("in", "");
            }
            var smallPanel = document.getElementById("sm-project-" + PROJECTS[i].id+"-panel");
            if(smallPanel){
                smallPanel.className = smallPanel.className.replace("info", "default");                
            }
            var smallContent = document.getElementById("sm-project-" + PROJECTS[i].id+"-collapse");
            if(smallContent){
                smallContent.className = smallContent.className.replace("in", "");
            }
        } else {
            var panel = document.getElementById("project-" + PROJECTS[i].id+"-panel");
            if(panel){
                panel.className = panel.className.replace("default", "info");                
            }
            var content = document.getElementById("project-" + PROJECTS[i].id+"-collapse");
            if(content){
                content.className = content.className.includes("in") ? content.className : content.className+" in";
            }
            var smallPanel = document.getElementById("sm-project-" + PROJECTS[i].id+"-panel");
            if(smallPanel){
                smallPanel.className = smallPanel.className.replace("default", "info");                
            }
            var smallContent = document.getElementById("sm-project-" + PROJECTS[i].id+"-collapse");
            if(smallContent){
                smallContent.className = smallContent.className.includes("in") ? smallContent.className : smallContent.className+" in";
            }
        }
    }
}

function filterProjects(small){
    var searchInput = document.getElementById(small ? 'sm-proj-search' : 'proj-search');
    searchKey = searchInput.value;
    var otherInput = document.getElementById(!small ? 'sm-proj-search' : 'proj-search');
    otherInput.value = searchKey;
    var filteredProjects = PROJECTS.filter(function(p){
        return p.title.toUpperCase().includes(searchKey.toUpperCase()) || p.description.toUpperCase().includes(searchKey.toUpperCase());
    })
    filteredProjects = filteredProjects.filter(function(p){
        for(var i=0;i<selectedTags.length;i++){
            if(p.tags.includes(selectedTags[i])){
                return true;
            }
        }
        return false;
    })

    changePanels(filteredProjects);
}

function hideContent(){
    var oldContentDiv = document.getElementById("content-div-" + currentActive);
    if(oldContentDiv && !oldContentDiv.className.includes("hidden")){
      oldContentDiv.className = oldContentDiv.className + " hidden";
    }
  
    var leftSidebar = document.getElementById("left-sidebar");
    leftSidebar.classList.add("col-md-offset-3");
  
    var rightSidebar = document.getElementById("right-sidebar");
    rightSidebar.className = rightSidebar.className.replace("col-md-offset-9", "col-md-offset-6");
  
    currentActive="home";
  }
  
function init(){
    changePanels(PROJECTS);
    changeWells(EXPERIENCE);
    updateTagsFilter(true);
    filterProjects();
}

function initBig(){
    var containerLg = document.getElementById("container-lg");
    containerLg.className="";
    var containerSm = document.getElementById("container-sm");
    containerSm.className="collapse"; 
    size="lg";   
}

function initSmall(){
    var containerLg = document.getElementById("container-lg");
    containerLg.className="collapse";
    var containerSm = document.getElementById("container-sm");
    containerSm.className="";
    size = "sm";
}

function navTo(newActive){
    var oldPill = document.getElementById(currentActive+"-pill");
    if(oldPill){
        oldPill.className="inactive";
    }
    if (newActive === currentActive){
        hideContent();
    }else{
        var newPill = document.getElementById(newActive+"-pill");
        newPill.className="active";
        changeContent(newActive);
    }
}

function resizeBig(){
    var containerLg = document.getElementById("container-lg");
    containerLg.className="";
    var containerSm = document.getElementById("container-sm");
    containerSm.className="collapse";
    size="lg";
}

function resizeSmall(){
    var containerLg = document.getElementById("container-lg");
    containerLg.className="collapse";
    var containerSm = document.getElementById("container-sm");
    containerSm.className=""; 
    size="sm";  
}

function updateTagsFilter(first){
    var tagOptions = TAGS.map(function(t) {
        var out = "<li class=\"keep-open\"><a><i id=\"" + t + "-check\" class=\"fa fa-";
        if(selectedTags.includes(t) && !first){
            out += "check-";
        }
        out += "square-o\"></i> " + t + " <span class=\"badge\">" + TAGS_COUNT[t] + "</span></a></li>";
        return out;
    });

    var projectsTagFilter = document.getElementById('projects-tag-filter');
    projectsTagFilter.innerHTML = "<li class=\"keep-open\"><a>Select All</a></li><li class=\"keep-open\"><a>Select None</a></li><li class=\"divider\"/>" + tagOptions.join(" ");

    var tagOptions = TAGS.map(function(t) {
        var out = "<li class=\"keep-open\"><a><i id=\"sm-" + t + "-check\" class=\"fa fa-";
        if(selectedTags.includes(t) && !first){
            out += "check-";
        }
        out += "square-o\"></i>" + t + " <span class=\"badge\">" + TAGS_COUNT[t] + "</span></a></li>";
        return out;
    });

    var projectsTagFilter = document.getElementById('sm-projects-tag-filter');
    projectsTagFilter.innerHTML = "<li class=\"keep-open\"><a>Select All</a></li><li class=\"keep-open\"><a>Select None</a></li><li class=\"divider\"/>" + tagOptions.join(" ");
}