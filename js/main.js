import crawlTop100 from "../data/crawldata.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playList = $$(".playlist");
const playListMyList = $(".playlist-mylist");
const playListTop100 = $(".playlist-top100");
const cdThumb = $(".cd-thumb");
const nameTitle = $(".header-center .name");
const audio = $("#audio");
const togglePlay = $(".btn-toggle-play");
const iconPlay = $(".icon-play");
const iconPause = $(".icon-pause");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const tabsElement = $$(".tab-item");
const lineOfTabs = $(".line");
let songMyListElements, songTop100Elements;
const timePastElement = $(".time-past");
const timeRemainingElement = $(".time-remaining");

const cdWitdh = cdThumb.offsetWidth;
const cdHeight = cdThumb.offsetHeight;

const app = {
  currentIndex: 0,
  currentTab: "My List",
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  tabs: {
    myList: "My List",
    top100: "Top 100",
  },
  myListSongs: [
    {
      name: "id 072019",
      singer: "W/n ft 267",
      path: "https://a128-zmp3.zmdcdn.me/90083d6a4f1c62d2b7b5f3e76fed2986?authen=exp=1693835964~acl=/90083d6a4f1c62d2b7b5f3e76fed2986/*~hmac=ad5281b6bca0035d1d94379f772977a4",
      image: "./img/3107id072019.jpg",
    },
    {
      name: "Bức Tranh Từ Nước Mắt",
      singer: "Mr Siro",
      path: "https://a128-zmp3.zmdcdn.me/f3e6f9e86f695e3abf60c1347f7d32c8?authen=exp=1693840526~acl=/f3e6f9e86f695e3abf60c1347f7d32c8/*~hmac=23411ed541290f7d79991eacf7210b67",
      image: "./img/BucTranhTuNuocMat.jpg",
    },
    {
      name: "SAIGON SIMPLE LOVE",
      singer: "Nguyên ft Seth",
      path: "https://a128-zmp3.zmdcdn.me/ef58060cfb07d620934cb189e07aaa33?authen=exp=1693840619~acl=/ef58060cfb07d620934cb189e07aaa33/*~hmac=c8cc37d45789de6ad158c27eb1ddeb21",
      image: "./img/SaiGonSimpleLove.jpg",
    },
    {
      name: "Day Dứt Nỗi Đau",
      singer: "Mr Siro",
      path: "https://a128-zmp3.zmdcdn.me/2aa0351bf3b5dc23f2891c2352b8457d?authen=exp=1693840725~acl=/2aa0351bf3b5dc23f2891c2352b8457d/*~hmac=362612ae60d7ab0e97366561b6291f91",
      image: "./img/DayDutNoiDau.jpg",
    },
    {
      name: "Dưới Những Cơn Mưa",
      singer: "Mr Siro",
      path: "https://a128-zmp3.zmdcdn.me/9cedc121eba52e436f9f67391530deb4?authen=exp=1693840487~acl=/9cedc121eba52e436f9f67391530deb4/*~hmac=93685a303560d5473b26dad31be32d7f",
      image: "./img/DuoiNhungConMua.jpg",
    },
    {
      name: "Không Muốn Yêu Lại Càng Say Đắm",
      singer: "Mr Siro",
      path: "https://a128-zmp3.zmdcdn.me/731cfabce1f55425d8118d670e6ef3ac?authen=exp=1693840640~acl=/731cfabce1f55425d8118d670e6ef3ac/*~hmac=269279bd1c11524e000c709004a3d3c7",
      image: "./img/KhongMuonYeuLaiCangSayDam.jpg",
    },
    {
      name: "Có Em",
      singer: "Madihu ft LowG",
      path: "https://a128-zmp3.zmdcdn.me/3ec20f0e94c33be627db72fcdd9a1a83?authen=exp=1693840934~acl=/3ec20f0e94c33be627db72fcdd9a1a83/*~hmac=ac6a18eab51d09759f0d1d3e0854a3a7",
      image: "./img/CoEm.jpg",
    },
    {
      name: "Vì Anh Đâu Có Biết",
      singer: "Madihu ft Vũ",
      path: "https://f9-stream.nixcdn.com/Warner_Audio99/ViAnhDauCoBiet-MadihuVu-8095009.mp3?st=-LdFk3rQ87agg1SnIyxkpQ&e=1693719750",
      image: "./img/ViAnhDauCoBiet.jpg",
    },
    {
      name: "Bingo",
      singer: "Nguyên ft MC Wiz & Boyzed",
      path: "https://public.bn.files.1drv.com/y4mTWDKVa1vdtyPh5Rj7SSgYbMtrWoktU85zufqWh6QUrQDeETaVyvG7X3rGdM2h9GU18s2L4mckd3Tq99Cl3rdfBk1mSRgISC14yaf9HF_ecbT4quBvXOloBMrer1LdV4Wkn9HEN8clGbuB3DODGXb5u3uvmMMHLZqdFGeqEq3gmF9Hryw0NcUMgdSpqb4aD5n7XPIbaX2DW_DyAGipoxoZbnXa6mhahAkSJJY7m9CA1k?AVOverride=1",
      image: "./img/Bingo.jpg",
    },
    {
      name: "Không Yêu Xin Đừng Nói",
      singer: "UMIE",
      path: "https://a128-zmp3.zmdcdn.me/9c2ff9b7cb5fecf7f3ef9eb4da229243?authen=exp=1693840974~acl=/9c2ff9b7cb5fecf7f3ef9eb4da229243/*~hmac=759669d5cefe4a131827399a1ffbdd90",
      image: "./img/KhongYeuXinDungNoi.jpg",
    },
  ],
  top100Songs: [],
  getCurrentSong: function (currentTab) {
    if (currentTab === this.tabs.myList) {
      return this.myListSongs[this.currentIndex];
    } else if (currentTab === this.tabs.top100) {
      return this.top100Songs[this.currentIndex];
    }
  },
  renderMyListTab: function () {
    const htmls = this.myListSongs.map((element, index) => {
      return `<div class="song-element song-${index}">
            <div class="song-img">
              <img src="${element.image}" alt="${element.name}"/>
            </div>
            <div class="song-content">
              <h3 class="song-name">${element.name}</h3>
              <p class="song-author">${element.singer}</p>
            </div>
            <div class="song-more">
              <i class="fa fa-ellipsis-h"></i>
            </div> 
        </div>`;
    });
    playListMyList.innerHTML = htmls.join("");
    // Get song elements after render in MyList tab
    songMyListElements = playListMyList.querySelectorAll(".song-element");
  },
  renderTop100Tab: function () {
    const htmls = this.top100Songs.map((element, index) => {
      return `<div class="song-element song-${index}">
            <div class="song-img">
              <img src="${element.image}" alt="${element.name}"/>
            </div>
            <div class="song-content">
              <h3 class="song-name">${element.name}</h3>
              <p class="song-author">${element.singer}</p>
            </div>
            <div class="song-more">
              <i class="fa fa-ellipsis-h"></i>
            </div> 
        </div>`;
    });
    playListTop100.innerHTML = htmls.join("");
    // Get song elements after render in Top 100 tab
    songTop100Elements = playListTop100.querySelectorAll(".song-element");
  },
  handleCommonEvents: function () {
    const _this = this;
    // Excecute rotate cd
    const cdThumbAnimate = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        autoplay: false,
        duration: 60000, // 60s
        iterations: Infinity,
      }
    );
    cdThumbAnimate.pause();
    // Check event scroll to hidden cd element
    document.addEventListener("scroll", () => {
      // Get value when scroll screen
      const currentScoll = window.scrollY || document.documentElement.scrollTop;
      // Calculate new height and width of cd element
      const newCdWidth = cdWitdh - currentScoll;
      const newCdHeight = cdHeight - currentScoll;

      // Set width and height when scroll screen
      cdThumb.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cdThumb.style.height = newCdHeight > 0 ? newCdWidth + "px" : 0;
      // Set opacity when hidden
      cdThumb.style.opacity = newCdHeight / cdHeight;
    });
    // Check event click to play button
    togglePlay.addEventListener("click", () => {
      if (_this.isPlaying === true) {
        audio.pause();
      } else {
        audio.play();
      }
    });
    // Check status play of audio
    audio.addEventListener("play", () => {
      _this.isPlaying = true;
      iconPlay.style.display = "none";
      iconPause.style.display = "block";
      cdThumbAnimate.play();
    });
    // Check event status pause of audio
    audio.addEventListener("pause", () => {
      _this.isPlaying = false;
      iconPlay.style.display = "block";
      iconPause.style.display = "none";
      cdThumbAnimate.pause();
    });
    // Check event time past of song
    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        _this.runTimeOfSong();
        progress.value = Math.floor(
          (audio.currentTime / audio.duration) * 10000
        );
        _this.updateProgressColor();
      }
    });
    // Check event when audio ended
    audio.addEventListener("ended", () => {
      if (_this.isRepeat) {
        // If have enable repeat button
        // not doing and step to audio.play()
      } else if (_this.isRandom) {
        _this.clearPrevSongElement(_this.currentTab);
        // If have enable random button
        // Update current index
        _this.randomIndex(_this.currentIndex);
      } else {
        _this.clearPrevSongElement(_this.currentTab);
        // not
        // Update current index
        _this.nextSong();
      }
      // Delay 500ms
      setTimeout(() => {
        _this.loadCurrentSong();
        audio.play();
      }, 500);
    });
    //Check event change progress bar
    progress.addEventListener("change", (e) => {
      audio.currentTime = (e.target.value * audio.duration) / 10000;
      _this.updateProgressColor();
    });
    // Check event when move the progress button
    progress.addEventListener("input", () => {
      // Update color of progress bar
      _this.updateProgressColor();
    });
    //Check event when click next button
    nextBtn.addEventListener("click", () => {
      _this.clearPrevSongElement(_this.currentTab);
      // If have enable random button
      if (_this.isRandom) {
        // Update current index
        _this.randomIndex(_this.currentIndex, this.currentTab);
      } else {
        // Not
        // Update current index
        _this.nextSong(this.currentTab);
      }
      // Change status of button
      nextBtn.classList.add("active");
      // Delay 500ms
      setTimeout(() => {
        _this.loadCurrentSong();
        audio.play();
        nextBtn.classList.remove("active");
      }, 500);
    });
    //Check event when click previous button
    prevBtn.addEventListener("click", () => {
      _this.clearPrevSongElement(_this.currentTab);
      // If have enable random button
      if (_this.isRandom) {
        // Update current index
        _this.randomIndex(_this.currentIndex, this.currentTab);
      } else {
        // Update current index
        _this.prevSong(this.currentTab);
      }
      // Change status of button
      prevBtn.classList.add("active");
      // Delay 500ms
      setTimeout(() => {
        _this.loadCurrentSong();
        audio.play();
        prevBtn.classList.remove("active");
      }, 500);
    });
    //Check event when click random button
    randomBtn.addEventListener("click", () => {
      if (!_this.isRandom) {
        _this.isRandom = true;
        randomBtn.classList.add("active");
      } else {
        _this.isRandom = false;
        randomBtn.classList.remove("active");
      }
    });
    //Check event when click repeat button
    repeatBtn.addEventListener("click", () => {
      if (!_this.isRepeat) {
        _this.isRepeat = true;
        repeatBtn.classList.add("active");
      } else {
        _this.isRepeat = false;
        repeatBtn.classList.remove("active");
      }
    });
    //Check event when click title tab
    tabsElement.forEach((element, index) => {
      element.addEventListener("click", () => {
        // Remove active color for old tab
        $(".tab-item.active").classList.remove("active");
        // Add active for new tab
        tabsElement[index].classList.add("active");

        if (index === 0) {
          playList[0].style.display = "block";
          playList[1].style.display = "none";
          _this.currentTab = _this.tabs.myList;
          _this.handleMyListTabEvent();
        } else if (index === 1) {
          playList[1].style.display = "block";
          playList[0].style.display = "none";
          _this.currentTab = _this.tabs.top100;
          _this.handleTop100ListTabEvent();
        }

        //Update line under title tab
        lineOfTabs.style.width = element.offsetWidth + "px";
        lineOfTabs.style.left = element.offsetLeft + "px";
      });
    });
  },
  handleMyListTabEvent() {
    let _this = this;
    // Check event when click song element of My List Tab
    songMyListElements.forEach((songElement) => {
      songElement.onclick = (e) => {
        // If click different more button
        if (!(e.target.classList[0] === "fa")) {
          _this.clearPrevSongElement(_this.currentTab);
          // last class of song element
          const lastClass = songElement.classList[1];
          // Set currentIndex = id of song
          const regexCheckIndex = /[0-9]+/g;
          _this.currentIndex = Number(lastClass.match(regexCheckIndex));
          // Delay 200ms
          setTimeout(() => {
            _this.loadCurrentSong();
            audio.play();
          }, 200);
        }
      };
    });
  },
  handleTop100ListTabEvent() {
    let _this = this;
    // Check event when click song element of My List Tab
    songTop100Elements.forEach((songElement) => {
      songElement.onclick = (e) => {
        console.log(_this.currentTab);
        // If click different more button
        if (!(e.target.classList[0] === "fa")) {
          _this.clearPrevSongElement(_this.currentTab);
          // last class of song element
          const lastClass = songElement.classList[1];
          // Set currentIndex = id of song
          const regexCheckIndex = /[0-9]+/g;
          _this.currentIndex = Number(lastClass.match(regexCheckIndex));
          console.log(_this.currentIndex);
          // Delay 200ms
          setTimeout(() => {
            _this.loadCurrentSong();
            audio.play();
          }, 200);
        }
      };
    });
  },
  loadCurrentSong: function () {
    nameTitle.innerText = this.getCurrentSong(this.currentTab).name;
    cdThumb.src = this.getCurrentSong(this.currentTab).image;
    audio.src = this.getCurrentSong(this.currentTab).path;
    // Active current song elemnt
    let currentTabElement;
    if (this.currentTab === this.tabs.myList) {
      currentTabElement = playListMyList;
    } else if (this.currentTab === this.tabs.top100) {
      currentTabElement = playListTop100;
    }
    let currentSongElement = currentTabElement.querySelector(
      `.song-${this.currentIndex}`
    );
    currentSongElement.classList.add("activeSong");
    this.scrollToActiveSong();
  },
  nextSong: function (currentTab) {
    let songs;
    if (currentTab === this.tabs.myList) {
      songs = this.myListSongs;
    } else if (currentTab === this.tabs.top100) {
      songs = this.top100Songs;
    }
    this.currentIndex++;
    if (this.currentIndex >= songs.length) {
      this.currentIndex = 0;
    }
  },
  prevSong: function (currentTab) {
    let songs;
    if (currentTab === this.tabs.myList) {
      songs = this.myListSongs;
    } else if (currentTab === this.tabs.top100) {
      songs = this.top100Songs;
    }
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = songs.length - 1;
    }
  },
  randomIndex: function (currentIndex, currentTab) {
    let newIndex, songs;
    if (currentTab === this.tabs.myList) {
      songs = this.myListSongs;
    } else if (currentTab === this.tabs.top100) {
      songs = this.top100Songs;
    }
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === currentIndex);
    this.currentIndex = newIndex;
  },
  clearPrevSongElement: function (currentTab) {
    let currentPlaylist;
    if (currentTab === this.tabs.myList) {
      currentPlaylist = playListMyList;
    } else if (currentTab === this.tabs.top100) {
      currentPlaylist = playListTop100;
    }
    let currentSongElement = currentPlaylist.querySelector(
      `.song-${this.currentIndex}`
    );
    currentSongElement.classList.remove("activeSong");
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".activeSong").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 500);
  },
  runTimeOfSong: function () {
    // Calculate time-remaining
    let timeRemainingSeconds = Math.floor(audio.duration);
    let timeRemainingMinutes = Math.floor(timeRemainingSeconds / 60);
    let timeRemainingExtraSeconds = Math.floor(timeRemainingSeconds % 60);
    timeRemainingElement.innerText = `0${timeRemainingMinutes}:${
      timeRemainingExtraSeconds < 10
        ? "0" + timeRemainingExtraSeconds
        : timeRemainingExtraSeconds
    }`;
    // Calculatetime-past
    let timePastSeconds = Math.floor(audio.currentTime);
    let timePastMinutes = Math.floor(timePastSeconds / 60);
    let timePastExtraSeconds = Math.floor(timePastSeconds % 60);
    timePastElement.innerText = `0${timePastMinutes}:${
      timePastExtraSeconds < 10
        ? "0" + timePastExtraSeconds
        : timePastExtraSeconds
    }`;
  },
  updateProgressColor: function () {
    // Calculate progress past width
    let progressPastWidth = (progress.value / 10000) * progress.clientWidth;
    // Update
    progress.style.background = `linear-gradient(to right, #2a55e0 0%, #9c6ff0 ${Math.floor(
      progressPastWidth
    )}px, rgb(0, 0, 0,0.2) ${Math.floor(
      progressPastWidth
    )}px, rgba(0, 0, 0,0.2) 100%)`;
  },
  start: function () {
    // Add common listener events (DOM event)
    this.handleCommonEvents();
    // Load My List Tab
    this.loadMyListTab();
    // Load Top 100 Tab
    this.loadTop100Tab();
    // Load current Song
    this.loadCurrentSong();
  },
  loadMyListTab: function () {
    this.renderMyListTab();
    // Start with My List Tab
    this.handleMyListTabEvent();
  },
  loadTop100Tab: function () {
    crawlTop100() 
      .then((top100Songs) => {
        app.top100Songs = top100Songs;
        // app.myListSongs = app.myListSongs.concat(top100Songs);
      })
      .then(() => {
        // Render Top 100 List Song
        this.renderTop100Tab();  
        // Handle event of My List tab
        this.handleTop100ListTabEvent();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

app.start();
