var tag = "";
$(document).ready(function() {

  document.documentElement.className +=
    (("ontouchstart" in document.documentElement) ? ' touch' : ' no-touch');

  $('.sidenav').sidenav();

  $('input.autocomplete').autocomplete({
    data: {
      "teste": null,
    },
  });


  $(document).ready(function() {
    //Autocomplete
    $(function() {
      $("input").keyup(function() {
        tag = document.getElementById('tags').value;
        $.ajax({
          type: 'GET',
          url: 'https://yande.re/tag.json?name=' + tag,
          success: function(response) {
            var nameArray = response;
            var dataName = {};
            for (var i = 0; i < nameArray.length; i++) {
              //console.log(countryArray[i].name);
              dataName[nameArray[i].name] = nameArray[i].flag; //countryArray[i].flag or null
            }
            $('.autocomplete').autocomplete('updateData',
              dataName);
          }
        });
      });
    });
  });
});

window.onload = pageLoad;

var safeRate = true;

var repeats = 0;

function setSafe() {
  window.scrollTo(0, 0);
  safeRate = true;
  clearBox();
  page = 1;
  md5s = [];
  pageLoad();
  repeats = 0;
}

function search() {
  window.scrollTo(0, 0);
  clearBox();
  page = 1;
  md5s = [];
  tag = document.getElementById("tags").value;
  pageLoad();
  repeats = 0;
}

function updateCont() {
  document.getElementById("cont").innerHTML = window.repeats;
}

function setNotSafe() {
  window.scrollTo(0, 0);
  safeRate = false;
  clearBox();
  page = 1;
  md5s = [];
  pageLoad();
  repeats = 0;
}

var md5s = [];
var page = 1;

function nextPage() {
  page++;
  pageLoad();
}

function pageLoad() {
  if ($('#checkYan').is(':checked')) {
    updateYan();
  }
  if ($('#checkKona').is(':checked')) {
    updateKona();
  }
  if ($('#checkDan').is(':checked')) {
    updateDan();
  }
  if ($('#checkSan').is(':checked')) {
    updateSan();
  }
  /*if($('#checkGel').is(':checked')){
    updateGel();
    }*/
}

function clearBox() {
  $grid.masonry('remove', $grid.find('.block'));
}

function updateYan() {
  $.ajax({
    type: 'GET',
    url: 'https://yande.re/post.json?&page=' + page + '&tags=' + tag +
      '&commit=Search',
    data: {
      get_param: 'value'
    },
    dataType: 'json',
    success: function(data) {
      if ($.isEmptyObject(data)) {
        console.log('No more Ynadere Results');
        var rip =
          '<div class="block"><div class="card"><div class="card-image waves-effect waves-block waves-light"><a>No more Yandere Results</a></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">ID:<i class="material-icons right">more_vert</i></span><p><a rel="noopener noreferrer" href="">Source</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">ID:<i class="material-icons right">close</i></span><p>Tags: ' +
          tags + '.</p></div></div>';
        var $rip = $(rip);
        $grid.append($rip).masonry('appended', $rip);
        $grid.masonry();
        $grid.masonry('layout');
      }
      $.each(data, function(index, element) {
        var preview = element.preview_url;
        var id = element.id;
        var source = element.file_url;
        var md5 = element.md5;
        var safe = element.rating;
        var tags = element.tags;
        lmd5s = md5s.length;
        var stuff =
          '<div class="block"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" id="img" src="' +
          preview +
          '" ></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">ID: ' +
          id +
          '<i class="material-icons right">more_vert</i></span><p><a rel="noopener noreferrer" href="' +
          source +
          '">Source</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">ID: ' +
          id +
          '<i class="material-icons right">close</i></span><p>Tags: ' +
          tags + '.</p></div>  </div>';
        var $stuff = $(stuff);
        if (safeRate == true) {
          if (safe == "s") {
            if (inArray(md5, md5s)) {
              repeats++;
            } else {
              md5s.push(md5)
              $grid.append($stuff).masonry('appended', $stuff);
              $grid.masonry();
              $grid.masonry('layout');
            }
          }

        } else {
          if (inArray(md5, md5s)) {
            repeats++;
          } else {
            md5s.push(md5)
            $grid.append($stuff).masonry('appended', $stuff);
            $grid.masonry();
            $grid.masonry('layout');
          }
        }
      });
    },
    error: function(data) {
      var stuff =
        '<p class="infinite-scroll-last center">End of content</p>';
      var $stuff = $(stuff);
      $grid.append($stuff).masonry('appended', $stuff);
      $grid.masonry();
      $grid.masonry('layout');
    }
  });
}

function updateKona() {
  jQuery.support.cors = true;
  $.ajax({
    type: 'GET',
    url: 'https://konachan.com/post.json?' + 'page=' + page + '&tags=' +
      tag + '&commit=Search',
    data: {
      get_param: 'value'
    },
    dataType: 'json',
    success: function(data) {
      $.each(data, function(index, element) {
        var preview = element.preview_url;
        var id = element.id;
        var source = element.file_url;
        var md5 = element.md5;
        var safe = element.rating;
        var tags = element.tags;
        lmd5s = md5s.length;
        var stuff =
          '<div class="block"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" id="img" src="' +
          preview +
          '" ></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">ID: ' +
          id +
          '<i class="material-icons right">more_vert</i></span><p><a rel="noopener noreferrer" href="' +
          source +
          '">Source</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">ID: ' +
          id +
          '<i class="material-icons right">close</i></span><p>Tags: ' +
          tags + '.</p></div>  </div>';
        var $stuff = $(stuff);
        if (safeRate == true) {
          if (safe == "s") {
            if (inArray(md5, md5s)) {
              repeats++;
            } else {
              md5s.push(md5)
              $grid.append($stuff).masonry('appended', $stuff);
              $grid.masonry();
              $grid.masonry('layout');
            }
          }

        } else {
          if (inArray(md5, md5s)) {
            repeats++;
          } else {
            md5s.push(md5)
            $grid.append($stuff).masonry('appended', $stuff);
            $grid.masonry();
            $grid.masonry('layout');
          }
        }
      });
    },
    error: function(data) {
      var stuff =
        '<p class="infinite-scroll-last center">End of content</p>';
      var $stuff = $(stuff);
      $grid.append($stuff).masonry('appended', $stuff);
      $grid.masonry();
      $grid.masonry('layout');
    }
  });
}

function updateGel() {
  jQuery.support.cors = true;
  $.ajax({
    type: 'GET',
    url: 'https://gelbooru.com//index.php?page=dapi&s=post&q=index&json=1&pid=' +
      page + '&tags=' + tag,
    data: {
      get_param: 'value'
    },
    dataType: 'json',
    success: function(data) {
      $.each(data, function(index, element) {
        var imageSample = element.file_url;
        var preview = imageSample.replace("/images", "//images");
        var id = element.id;
        var source =
          'https://gelbooru.com/index.php?page=post&s=view&id=' + id;
        var md5 = element.hash;
        var safe = element.rating;
        var tags = element.tags;
        var height = element.height;
        var width = element.width;
        lmd5s = md5s.length;

        var stuff =
          '<div class="block"><div class="card"><div class="card-image waves-effect waves-block waves-light"><object width="' +
          width + '" height="' + height + '" data="' + preview +
          '" type="image/png"><img class="activator" id="img" src="' +
          imageSample +
          '" ></object></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">ID: ' +
          id +
          '<i class="material-icons right">more_vert</i></span><p><a rel="noopener noreferrer" href="' +
          source +
          '">Source</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">ID: ' +
          id +
          '<i class="material-icons right">close</i></span><p>Tags: ' +
          tags + '.</p></div>  </div>';
        var $stuff = $(stuff);
        if (safeRate == true) {
          if (safe == "s") {
            if (inArray(md5, md5s)) {
              repeats++;
            } else {
              md5s.push(md5)
              $grid.append($stuff).masonry('appended', $stuff);
              $grid.masonry();
              $grid.masonry('layout');
            }
          }

        } else {
          if (inArray(md5, md5s)) {
            repeats++;
          } else {
            md5s.push(md5)
            $grid.append($stuff).masonry('appended', $stuff);
            $grid.masonry();
            $grid.masonry('layout');
          }
        }
      });
    },
    error: function(data) {
      var stuff =
        '<p class="infinite-scroll-last center">End of content</p>';
      var $stuff = $(stuff);
      $grid.append($stuff).masonry('appended', $stuff);
      $grid.masonry();
      $grid.masonry('layout');
    }
  });
}


function updateSan() {
  jQuery.support.cors = true;
  $.ajax({
    type: 'GET',
    url: 'https://capi-beta.sankakucomplex.com/post/index.json?page=' +
      page + '&limit=20&tags=' + tag,
    data: {
      get_param: 'value'
    },
    dataType: 'json',
    success: function(data) {
      $.each(data, function(index, element) {
        var sample = element.sample_url;
        var preview = sample.replace("//cs", "http://cs");
        var id = element.id;
        var source = element.file_url;
        var md5 = element.md5;
        var safe = element.rating;
        var tags = element.tags;
        lmd5s = md5s.length;
        var stuff =
          '<div class="block"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" id="img" src="' +
          preview +
          '" ></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">ID: ' +
          id +
          '<i class="material-icons right">more_vert</i></span><p><a rel="noopener noreferrer" href="' +
          source +
          '">Source</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">ID: ' +
          id +
          '<i class="material-icons right">close</i></span><p>Tags: ' +
          tags + '.</p></div>  </div>';
        var $stuff = $(stuff);
        if (safeRate == true) {
          if (safe == "s") {
            if (inArray(md5, md5s)) {
              repeats++;
            } else {
              md5s.push(md5)
              $grid.append($stuff).masonry('appended', $stuff);
              $grid.masonry();
              $grid.masonry('layout');
            }
          }

        } else {
          if (inArray(md5, md5s)) {
            repeats++;
          } else {
            md5s.push(md5)
            $grid.append($stuff).masonry('appended', $stuff);
            $grid.masonry();
            $grid.masonry('layout');
          }
        }
      });
    },
    error: function(data) {
      var stuff =
        '<p class="infinite-scroll-last center">End of content</p>';
      var $stuff = $(stuff);
      $grid.append($stuff).masonry('appended', $stuff);
      $grid.masonry();
      $grid.masonry('layout');
    }
  });
}


function updateDan() {
  jQuery.support.cors = true;
  $.ajax({
    type: 'GET',
    url: 'https://danbooru.donmai.us/posts.json?' + 'page=' + page +
      '&tags=' + tag + '&commit=Search',
    data: {
      get_param: 'value'
    },
    dataType: 'json',
    success: function(data) {
      $.each(data, function(index, element) {
        var preview = element.preview_file_url;
        var id = element.id;
        var source = element.large_file_url;
        var md5 = element.md5;
        var safe = element.rating;
        var tags = element.tag_string;
        lmd5s = md5s.length;
        var stuff =
          '<div class="block"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" id="img" src="' +
          preview +
          '" ></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">ID: ' +
          id +
          '<i class="material-icons right">more_vert</i></span><p><a rel="noopener noreferrer" href="' +
          source +
          '">Source</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">ID: ' +
          id +
          '<i class="material-icons right">close</i></span><p>Tags: ' +
          tags + '.</p></div>  </div>';
        var $stuff = $(stuff);
        if (safeRate == true) {
          if (safe == "s") {
            if (inArray(md5, md5s)) {
              repeats++;
            } else {
              md5s.push(md5)
              $grid.append($stuff).masonry('appended', $stuff);
              $grid.masonry();
              $grid.masonry('layout');
            }
          }

        } else {
          if (inArray(md5, md5s)) {
            repeats++;
          } else {
            md5s.push(md5)
            $grid.append($stuff).masonry('appended', $stuff);
            $grid.masonry();
            $grid.masonry('layout');
          }
        }
      });
    },
    error: function(data) {
      var stuff =
        '<p class="infinite-scroll-last center">End of content</p>';
      var $stuff = $(stuff);
      $grid.append($stuff).masonry('appended', $stuff);
      $grid.masonry();
      $grid.masonry('layout');
    }
  });
}

function inArray(needle, haystack) {
  var count = haystack.length;
  for (var i = 0; i < count; i++) {
    if (haystack[i] === needle) {
      return true;
    }
  }
  return false;
}

$(document.body).on('touchmove', onScroll); // for mobile
$(window).on('scroll', onScroll);

function onScroll() {
  if ($(window).scrollTop() + window.innerHeight >= document.body.scrollHeight) {
    nextPage();
    $grid.masonry();
  }
}

var $grid = $('.grid').masonry({
  itemSelector: '.block',
  gutter: 15
});

$grid.imagesLoaded().progress(function() {
  $grid.masonry('layout');
});

setInterval(function() {
  $grid.masonry('layout');
  updateCont();
  //checkImages();
}, 1000);

function checkImages() {
  $('img').each(function() { // selecting all image element on the page

    var img = new Image($(this)); // creating image element

    img.onerror = function() { // trigger if the image wasn't loaded
      console.log($(this).attr('src') + ' - error!');
      $(this).attr('src') = $(this).attr('src').replace("/images",
        "images")
    }

    img.src = $(this).attr('src'); // pass src to image object



    console.log(img.complete);

  });
}
