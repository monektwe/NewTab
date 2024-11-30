const $bookmarkBar = document.getElementById('bookmark-bar'); //북마크 바
const $bookmarkCloseBtn = document.getElementById('bookmark-close-btn'); // 북마크 닫기 버튼
const $bookmarkOpenBtn = document.getElementById('bookmark-open-btn'); // 북마크 열기 버튼
const $bookmarkCloseText = document.getElementById('bookmark-close-btn-text'); //북마크 닫기 텍스트
const $bookmarkOpenText = document.getElementById('bookmark-open-btn-text'); //북마크 열기 텍스트

const isBookmarkBarOpen = localStorage.getItem('isBookmarkBarOpen');

if (isBookmarkBarOpen === 'close') {
    //현재 북마크 바가 닫혀있다면
    $bookmarkBar.style.display = 'none';
    $bookmarkCloseBtn.style.display = 'none';
    $bookmarkOpenBtn.style.display = 'flex';
} else {
    //현재 북마크 바가 열려있다면
    $bookmarkBar.style.display = 'block';
    $bookmarkCloseBtn.style.display = 'flex';
    $bookmarkOpenBtn.style.display = 'none';
}

const bookmarkBarToggle = () => {
    let isBookmarkBarOpen = localStorage.getItem('isBookmarkBarOpen');
    if (isBookmarkBarOpen === 'close') {
        //isBookmarkBarOpen 값이 close일 경우
        //닫힘 -> 열림
        localStorage.setItem('isBookmarkBarOpen', 'open');
        $bookmarkBar.style.display = 'block';
        $bookmarkCloseBtn.style.display = 'flex';
        $bookmarkOpenBtn.style.display = 'none';
        return;
    }
    //isBookmarkBarOpen 값이 없거나, 값이 open일 경우
    //열림 -> 닫힘
    localStorage.setItem('isBookmarkBarOpen', 'close');
    $bookmarkBar.style.display = 'none';
    $bookmarkCloseBtn.style.display = 'none';
    $bookmarkOpenBtn.style.display = 'flex';
};

$bookmarkCloseText.addEventListener('click', bookmarkBarToggle);
$bookmarkOpenText.addEventListener('click', bookmarkBarToggle);
const $newBookmarkForm = document.getElementById('bookmark-item-input-form'); // 새로운 북마크 정보 입력 폼
const $newBookmarkFormToggleBtn = document.getElementById('bookmark-item-add-btn'); // 북마크 추가 폼 버튼
const $bookmarkAddBtn = document.getElementById('add-btn');
const $bookmarkCancelBtn = document.getElementById('cancel-btn');
const $bookmarkItemList = document.getElementById('bookmark-list'); // 북마크 리스트

let bookmarkList = [];
localStorage.getItem('bookmarkList')
    ? (bookmarkList = JSON.parse(localStorage.getItem('bookmarkList')))
    : localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));

let isAddBtnClick = false;
$newBookmarkForm.style.display = 'none';

const newBookmarkToggle = () => {
    isAddBtnClick = !isAddBtnClick;
    isAddBtnClick ? ($newBookmarkForm.style.display = 'block') : ($newBookmarkForm.style.display = 'none');
};

const deleteBookmarkItem = (id) => {
    const isDelete = window.confirm('정말 삭제하시겠습니까?');
    if (isDelete) {
        let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
        let nowBookmarkList = bookmarkList.filter((elm) => elm.createdAt !== id);

        localStorage.setItem('bookmarkList', JSON.stringify(nowBookmarkList));
        document.getElementById(`bookmark-item-${id}`).remove();
        return;
    }
};

const setBookmarkItem = (item) => {
    //북마크 아이템 나타내기
    const $bookmarkItem = document.createElement('div');
    $bookmarkItem.classList.add('bookmark-item');
    $bookmarkItem.id = `bookmark-item-${item.createdAt}`;

    const $bookmarkInfo = document.createElement('div');
    $bookmarkInfo.classList.add('bookmark-info');

    const $bookmarkUrl = document.createElement('a');
    $bookmarkUrl.classList.add('bookmark-url');

    const $urlIcon = document.createElement('div');
    $urlIcon.classList.add('url-icon');

    const $urlIconImg = document.createElement('img');

    const $urlName = document.createElement('div');
    $urlName.classList.add('url-name');

    const $bookmarkDelBtn = document.createElement('div');
    $bookmarkDelBtn.classList.add('del-btn');
    $bookmarkDelBtn.textContent = '삭제';
    $bookmarkDelBtn.addEventListener('click', () => {
        deleteBookmarkItem(item.createdAt);
    });

    $bookmarkUrl.href = item.url;
    $urlIconImg.src = `https://www.google.com/s2/favicons?domain_url=${item.url}`;
    $urlName.textContent = item.name;

    $bookmarkItem.appendChild($bookmarkInfo);
    $bookmarkItem.appendChild($bookmarkDelBtn);
    $bookmarkInfo.appendChild($bookmarkUrl);
    $bookmarkUrl.appendChild($urlIcon);
    $bookmarkUrl.appendChild($urlName);
    $urlIcon.appendChild($urlIconImg);

    $bookmarkItemList.appendChild($bookmarkItem);
};

const setBookmarkList = () => {
    bookmarkList.forEach((item) => {
        setBookmarkItem(item);
    });
};

const addBookmarkItem = () => {
    let bookmarkList = [];
    if (localStorage.getItem('bookmarkList')) {
        bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
    }
    let $name = document.getElementById('new-bookmark-input-name');
    let $url = document.getElementById('new-bookmark-input-url');
    let createdAt = Date.now();
    bookmarkList.push({ name: $name.value, url: $url.value, createdAt: createdAt });
    localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
    setBookmarkItem({ name: $name.value, url: $url.value, createdAt: createdAt });
    $name.value = '';
    $url.value = '';
    newBookmarkToggle();
};

setBookmarkList();

$newBookmarkFormToggleBtn.addEventListener('click', newBookmarkToggle); //북마크 폼 토글 버튼
$bookmarkAddBtn.addEventListener('click', addBookmarkItem); //추가 버튼
$bookmarkCancelBtn.addEventListener('click', newBookmarkToggle); //취소 버튼