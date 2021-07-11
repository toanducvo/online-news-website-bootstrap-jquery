$(document).ready(function () {
  $(".nav-tabs a").click(function () {
    $(this).tab("show");
  });

  $("#button-addon1").click(
    (e) => {
      if($("input#search-news").val() === "")
        e.preventDefault()
    }
  )

  // https://github.com/ductoanvo/zingnews-scraping
  $.getJSON("/data/zingnews.json", function (json) {
    // console.log(json)
    $("div#tin-noi-bat").append(renderTinNoiBat(json));
    $("div#menu1").append(renderTinTuc(json, "Bóng đá", 5));
    $("div#menu2").append(renderTinTuc(json, "Thời trang", 5));
    $("div#menu3").append(renderTinTuc(json, "Tuyển sinh 2021", 5));
    $("div#menu4").append(renderTinTuc(json, "Bất động sản", 5));
    $("div#ban-quan-tam > h3").after(renderCoTheBanQuanTam(json, 5));
    $("div#tin-suc-khoe").append(renderTinTongHop(json, "Sức khỏe"));
    $("div#tin-xa-hoi").append(renderTinTongHop(json, "Xã hội"));
    $("div#tin-the-gioi").append(renderTinTongHop(json, "Thế giới"));
    $("div#tin-the-thao").append(renderTinTongHop(json, "Thể thao"));
    $("div#tin-kinh-doanh").append(renderTinTongHop(json, "Kinh doanh"));
    $("div#tin-cong-nghe").append(renderTinTongHop(json, "Công nghệ"));
    if (
      new RegExp(/pages.*/gm).test(window.location.href) &&
      !($("title").text() === "Tìm kiếm")
    ) {
      $("div.tinchinh").append(renderTinChinh(json, $("title").text()));
      $("div.tinmoi > div.row > div.col-sm-7").append(
        renderTinMoiNhat(json, $("title").text(), 10)
      );
    }
  });

  $("div#username-input > div.alert-warning").hide();
  $("div#password-input > div.alert-warning").hide();

  $("div#username-input > input#username").blur(() => {
    const email = $("div#username-input > input#username").val();
    const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gm;
    if (!new RegExp(regexEmail).test(email))
      $("div#username-input > div.alert-warning").show();
    else $("div#username-input > div.alert-warning").hide();
  });

  $("div#password-input > input#password").blur(() => {
    const password = $("div#password-input > input#password").val();
    const regexPassword = /^(\W|\w|\d){8,}/gm;
    if (!new RegExp(regexPassword).test(password)) {
      $("div#password-input > div.alert-warning").show();
    } else $("div#password-input > div.alert-warning").hide();
  });

  $("div#submit-button > button#submit").click((e) => {
    e.preventDefault();
    if (
      $("div#username-input > div.alert-warning").is(":hidden") &&
      $("div#username-input > input#username").val() !== ""
    ) {
      if (
        $("div#password-input > div.alert-warning").is(":hidden") &&
        $("div#password-input > input#password").val() !== ""
      ) {
        alert("Đăng nhập thành công");
        window.location.reload();
      } else $("div#password-input > div.alert-warning").show();
    } else $("div#username-input > div.alert-warning").show();
  });

  $("div.modal-footer > button ").click((e) => {
    e.preventDefault();
    $("div#username-input > div.alert-warning").hide();
    $("div#password-input > div.alert-warning").hide();
  });

  $("div.modal").blur((e) => {
    e.preventDefault();
    $("div#username-input > div.alert-warning").hide();
    $("div#password-input > div.alert-warning").hide();
  });
});

const getRandomPostsByCategory = (data, category, numberOfPost) => {
  const result = data.filter((data) => data.category.includes(category));
  return result.slice(0, numberOfPost);
};

const getRandomPosts = (data, numberOfPost) => {
  const result = [];
  for (let i = 0; i < numberOfPost; i++) {
    randomIndex = Math.floor(Math.random() * data.length);
    result.push(data[randomIndex]);
  }
  return result;
};

const renderTinNoiBat = (data) => {
  const result = getRandomPosts(data, 4);
  const template = `<div class="content-1 col-sm-5">
        <div class="news">
          <a href="${result[0].url}">
            <img src="${result[0].thumbnail}" alt="" />
            <h4>${result[0].title}</h4>
          </a>
        </div>
    </div>
    <div class="content-2 col-sm-2">
      <div class="news">
        <a href="${result[1].url}">
          <img src="${result[1].thumbnail}" alt="" />
          <p class="media-body">${result[1].title}</p>
        </a>
      </div>
      <div class="news">
        <a href="${result[2].url}">
          <img src="${result[2].thumbnail}" alt="" />
          <p class="media-body">${result[2].title}</p>
        </a>
      </div>
    </div>
    <div class="content-1 col-sm-5">
      <div class="news">
        <a href="${result[3].url}">
          <img src="${result[3].thumbnail}" alt="" />
          <h4>${result[3].title}</h4>
        </a>
      </div>
    </div>`;
  return template;
};

const renderTinTuc = (data, category, numberOfPost) => {
  const result = getRandomPostsByCategory(data, category, numberOfPost);
  var template = "";
  result.forEach((d) => {
    const {
      id,
      title,
      url,
      description,
      thumbnail,
      category_parent,
      category,
      time,
    } = d;
    template += `<div class="media news">
              <a href="${url}">
                <img src="${thumbnail}">
              </a>
              <div class="media-body">
                <h4>${title}</h4>
                <span>${time}</span>
                <p>${description}</p>
              </div>
            </div>`;
  });
  return template;
};

const renderCoTheBanQuanTam = (data, numberOfPost) => {
  const result = getRandomPosts(data, numberOfPost);
  var template = "";
  result.forEach((d) => {
    const {
      id,
      title,
      url,
      description,
      thumbnail,
      category_parent,
      category,
      time,
    } = d;
    template += `
      <div class="news">
        <a href="${url}">
          <img src="${thumbnail}" class="align-self-start mr-3"/>
        </a>
        <div class="title">
          ${title}
        </div>
    </div>`;
  });
  return template;
};

const renderTinTongHop = (data, category) => {
  const result = getRandomPostsByCategory(data, category, 3);
  var template = `
          <h3>${category}</h3>
          <div class="news">
            <a href="${result[0].url}">
              <img src="${result[0].thumbnail}" alt="" class="w-100"/>
            </a>
            <p><b>${result[0].title}</b></p>
          </div>
          <div class="news row">
            <a href="${result[1].url}" class="col-md-6">
              <img src="${result[1].thumbnail}" alt="" class="w-100"/>
            </a>
            <p class="col-md-6">${result[1].title}</p>
          </div>
          <br />
          <div class="news row">
            <a href="${result[2].url}" class="col-md-6">
              <img src="${result[2].thumbnail}" alt="" class="w-100"/>
            </a>
            <p class="col-md-6">${result[2].title}</p>
          </div>`;
  return template;
};

const renderTinChinh = (data, category) => {
  const result = getRandomPostsByCategory(data, category, 5);
  var template = `
  <h3>| ${category}</h3>
          <div class="row">
            <div class="news col-sm-5">
              <a href="${result[0].url}">
                <img class="d-block w-100" src="${result[0].thumbnail}" alt="First slide"/>
              </a>
              <div class="title">
                <p><b>${result[0].title}</b></p>
              </div>
            </div>
            <div class="news col-sm-3">
              <a href="${result[1].url}">
                <img class="d-block w-100" src="${result[1].thumbnail}" alt="First slide"/>
              </a>
              <div class="title">
                <p>${result[1].title}</p>
              </div>
            </div>
            <div class="col-sm-4"></div>
          </div>
          <div class="row">
            <div class="col-sm-8 row">
              <div class="news col-sm-4">
                <a href="${result[2].url}">
                  <img class="d-block w-100" src="${result[2].thumbnail}" alt="First slide"/>
                </a>
                <div class="title">
                  <p>${result[2].title}</p>
                </div>
              </div>
              <div class="news col-sm-4">
                <a href="${result[3].url}">
                  <img class="d-block w-100" src="${result[3].thumbnail}" alt="First slide"/>
                </a>
                <div class="title">
                  <p>${result[3].title}</p>
                </div>
              </div>
              <div class="news col-sm-4">
                <a href="${result[4].url}">
                  <img class="d-block w-100" src="${result[4].thumbnail}" alt="First slide"/>
                </a>
                <div class="title">
                  <p>
                  ${result[4].title}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-sm-4"></div>
          </div>`;
  return template;
};

const renderTinMoiNhat = (data, category, numberOfPost) => {
  var template = "";
  const result = () => {
    const tmp = [];
    const news = data.filter((data) => data.category.includes(category));
    for (let i = 0; i < numberOfPost; i++) {
      randomIndex = Math.floor(Math.random() * news.length);
      tmp.push(news[randomIndex]);
      news.splice(randomIndex, 1);
    }
    return tmp;
  };

  result().forEach((d) => {
    const {
      id,
      title,
      url,
      description,
      thumbnail,
      category_parent,
      category,
      time,
    } = d;
    template += `<div class="news row">
      <div class="col-sm-4">
        <a href="${url}">
          <img src="${thumbnail}" class="w-100" />
        </a>
      </div>
      <div class="media-body col-sm-8">
        <h4>
          ${title}
        </h4>
        <p>
          ${description}
      </p>
      </div>
    </div>`;
  });
  return template;
};
