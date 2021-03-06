(function() {
  'use strict';

  var HomeCtrl = function($rootScope, $scope,$window,FirebaseFactory) {

    $('body').bind('touchmove', function(e){e.preventDefault();});

    $('body').css("overflow","hidden");
    $('body').css("overflow","none");
    $('body').css("height","100vh");
    $('.overlay').css("height","100vh");
    $('.overlay').css("overflow","none");
    $(document).off("keydown");
    $(window).off("keydown");
    $(document).off("keyup");
    document.querySelectorAll("audio").forEach((item)=>{item.muted = false;});
    $scope.getHighScores = getHighScores;
    $scope.highScorePlayers=[];
    function space1(thing, from, to) {
      TweenMax.fromTo(thing, Math.floor(Math.random() * 100), { y: from }, { y: to,
        onComplete: space1,
        onCompleteParams: [thing, from, to],
        ease: Linear.easeNone });
    }

    var itemsDown = [".1light4", ".1light5", ".1light6", ".1light7", ".1light8", ".1light11", ".1light12", ".1light13", ".1light14", ".1light15", ".1light16"].forEach(function (e) {
      return space1(e, -1080, 1080);
    });
    var itemsUp = [".1light1", ".1light2", ".1light3", ".1light9", ".1light10", ".1light17"].forEach(function (e) {
      return space1(e, 1080, -1080);
    });
    //////////////HOME ANIMATION EVENTS///////////////
    document.getElementById("play").focus();
    $('.overlay').css("display","block").css("opacity","0");
    setTimeout(()=>{
      $('.overlay').css("transition","all 3s").css("transform","scale(1.2)");
      $('.overlay').css("opacity","1").css("ease-in","20s");
            // setTimeout(()=>{

            // },1000);
            $('.overlay').css("overflow","hidden");
          },1000);
    //////////////CLICK EVENTS///////////////
    $(window).on("click",()=>{
      if (document.getElementById("play")===null) {
        return false;
      }
      if(document.getElementById("play").checked === true) {
        document.getElementById("play").focus();

      } else if (document.getElementById("highScores").checked) {
        document.getElementById("highScores").focus();
      }
      else if (document.getElementById("multiplay").checked) {
        document.getElementById("multiplay").focus();

      } else if (document.getElementById("howToPlay").checked) {
        document.getElementById("howToPlay").focus();
      }
    });


    document.getElementById("playButton").addEventListener("click",()=>{

      $('body').css("overflow-y","hidden !important");
      $('.colorTheme').css("transition","all 1.5s").css("transform","scale(5)");
      setTimeout(()=>{

        $window.location.href = "#!/Tetris";
      },1000);
    });
    document.getElementById("multiButton").addEventListener("click",()=>{

      $('body').css("overflow-y","hidden !important");
      $('.colorTheme').css("transition","all 1.5s").css("transform","scale(5)");
      setTimeout(()=>{

        $window.location.href = "#!/FTris1on1";
      },1000);
    });
    document.getElementById("highScoresButton").addEventListener("click",()=>{
      $("#playButton").css("background-color","rgba(255,255,255,0)");
      $("#howToPlayButton").css("background-color","rgba(255,255,255,0)");
      $("#multiButton").css("background-color","rgba(255,255,255,0)");
      $("#highScoresButton").css("background-color","rgba(255,255,255,0.4)");
    });
    document.getElementById("howToPlay").addEventListener("click",()=>{
      $("#highScoresButton").css("background-color","rgba(255,255,255,0)");
      $("#playButton").css("background-color","rgba(255,255,255,0)");
      $("#multiButton").css("background-color","rgba(255,255,255,0)");
      $("#howToPlayButton").css("background-color","rgba(255,255,255,0.4)");
    });
    //////////////KEYBOARD EVENTS///////////////
    $(window).on("keyup",(e)=>{
      if (document.getElementById("play")===null) {
        return false;
      }
      if(document.getElementById("play").checked === true) {
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#highScoresButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#multiButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#playButton").css("background-color","rgba(255,255,255,0.4)").addClass('hoverclass');

      } else if (document.getElementById("multiplay").checked) {
        $("#playButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#highScoresButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#multiButton").css("background-color","rgba(255,255,255,0.4)").addClass('hoverclass');
      }else if (document.getElementById("highScores").checked) {
        $("#playButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#multiButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#highScoresButton").css("background-color","rgba(255,255,255,0.4)").addClass('hoverclass');
      } else if (document.getElementById("howToPlay").checked) {
        $("#highScoresButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#playButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#multiButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0.4)").addClass('hoverclass');
      }
      switch(e.keyCode) {
        case 13:
        if(document.getElementById("play").checked){
          $('body').css("overflow-y","scroll !important");
          $('.colorTheme').css("transition","all 1.5s").css("transform","scale(5)");
          setTimeout(()=>{

            $window.location.href = "#!/Tetris";
          },1000);
        }else if(document.getElementById("multiplay").checked){
          $('body').css("overflow-y","scroll !important");
          $('.colorTheme').css("transition","all 1.5s").css("transform","scale(5)");
          setTimeout(()=>{

            $window.location.href = "#!/FTris1on1";
          },1000);
        }else if(document.getElementById("highScores").checked) {
          $("#highScoreModal").modal("toggle");
          document.getElementById("highScores").focus();
        } else if(document.getElementById("howToPlay").checked) {
          $("#howToPlayModal").modal("toggle");
          document.getElementById("howToPlay").focus();
        } else {
          document.getElementById("play").focus();
        }
      }
    });
    ////////////////HIGH SCORE MODAL///////////////
    function getHighScores() {
      FirebaseFactory.getHighScores().then((score)=>{
        let scores = score;
        let keys = Object.keys(scores);
        let values = Object.values(scores);

        values.sort((a,b)=>{

          if (a.score < b.score){
            return 1;
          }
          if (a.score > b.score){
            return -1;
          }
          return 0;
        });
        values = values.splice(0,3);
        $scope.highScorePlayers=values;
      });
    }
    $scope.getHighScores();


  };

  HomeCtrl.$inject = ['$rootScope', '$scope','$window','FirebaseFactory'];
  angular.module('TetrisApp').controller('HomeCtrl', HomeCtrl);
})();
