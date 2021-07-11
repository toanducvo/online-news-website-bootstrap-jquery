$(document).ready(function () {
    const query = decodeURI(window.location.href.split("?search=")[1]).replace(/\+/gm,` `);

    $.getJSON("/data/zingnews.json", function (json) {
        if (query === "undefined" || query === "") {
            $("div.result > p.result-number").text("Tìm kiếm không phù hợp");
            $("div.result > ul.list-result").remove();
            $("title").text(`Tìm kiếm`)
        } else {
            $("title").text(`Kết quả tìm kiếm | ${query}`)
            $("input#search-news").val(query)
            const result = search(json, query);
            if (result.length != 0) {
                $("div.result > p.result-number").text(
                    `Đã tìm thấy ${result.length} kết quả liên quan đến "${query}"`
                );
                result.forEach((element) => {
                    const { id, title, url, description, thumbnail, category_parent, category, time } = element;
                    $("div.result > ul.list-result").append(
                        ` <li>
                            <a href="${url}">
                                <div class="card mb-6">
                                <img src="${thumbnail}" class="card-img-left"
                                    alt="" />
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">
                                    ${description}
                                    </p>
                                    <p class="card-text">
                                    <small class="text-muted">${time}</small>
                                    </p>
                                </div>
                                </div>
                            </a>
                        </li>`
                    );
                });
            }
            else {
                $("div.result > p.result-number").text(
                    `Không có kết quả phù hợp cho "${query}"`
                );
            }
        }
    });
});

const search = (data, query) => {
    const result = data.filter(
        (d) => d.category.toUpperCase().includes(query.toUpperCase()) || d.title.toUpperCase().includes(query.toUpperCase())
    );
    return result;
};
