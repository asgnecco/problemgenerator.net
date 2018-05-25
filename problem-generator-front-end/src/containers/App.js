import React, { Component } from 'react';
import classes from './App.scss';
import Heading from '../components/heading/heading.js';
import '../global/fonts.scss';
import NavMenu from '../components/nav/navMenu.js';
import animation from './margin-animation.scss';
import ProblemArea from '../components/problemArea/problemArea.js';

class App extends Component {

    state = {
        menu: null,
        topicsList: [
            {
                topicName: 'Calculus',
                subtopics: [
                    'Derivatives',
                    'Integrals'
                ]
            },
            {
                topicName: 'Algebra',
                subtopics: [
                    'Simplifying Linear Equations',
                    'Simplifying Radicals'
                ]
            },
            {
                topicName: 'Linear Algebra',
                subtopics: [
                    'Euler Reduction',
                    'Inverse Matrices'
                ]
            }
        ],
        currentProblem: {
            id: 1,
            description: "Solve the following integral:",
            svg: '<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"28.024ex\" height=\"6.676ex\" style=\"vertical-align: -2.338ex;\" viewBox=\"0 -1867.7 12065.8 2874.4\" role=\"img\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" aria-labelledby=\"MathJax-SVG-1-Title\"> <title id=\"MathJax-SVG-1-Title\">E=\\int_a^b \\frac{\\sqrt{x^2 + (\\sin{20})^2}}{b*x + c} dx</title> <defs aria-hidden=\"true\"> <path stroke-width=\"1\" id=\"E1-MJMATHI-45\" d=\"M492 213Q472 213 472 226Q472 230 477 250T482 285Q482 316 461 323T364 330H312Q311 328 277 192T243 52Q243 48 254 48T334 46Q428 46 458 48T518 61Q567 77 599 117T670 248Q680 270 683 272Q690 274 698 274Q718 274 718 261Q613 7 608 2Q605 0 322 0H133Q31 0 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q146 66 215 342T285 622Q285 629 281 629Q273 632 228 634H197Q191 640 191 642T193 659Q197 676 203 680H757Q764 676 764 669Q764 664 751 557T737 447Q735 440 717 440H705Q698 445 698 453L701 476Q704 500 704 528Q704 558 697 578T678 609T643 625T596 632T532 634H485Q397 633 392 631Q388 629 386 622Q385 619 355 499T324 377Q347 376 372 376H398Q464 376 489 391T534 472Q538 488 540 490T557 493Q562 493 565 493T570 492T572 491T574 487T577 483L544 351Q511 218 508 216Q505 213 492 213Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMAIN-3D\" d=\"M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z\"></path> <path stroke-width=\"1\" id=\"E1-MJSZ2-222B\" d=\"M114 -798Q132 -824 165 -824H167Q195 -824 223 -764T275 -600T320 -391T362 -164Q365 -143 367 -133Q439 292 523 655T645 1127Q651 1145 655 1157T672 1201T699 1257T733 1306T777 1346T828 1360Q884 1360 912 1325T944 1245Q944 1220 932 1205T909 1186T887 1183Q866 1183 849 1198T832 1239Q832 1287 885 1296L882 1300Q879 1303 874 1307T866 1313Q851 1323 833 1323Q819 1323 807 1311T775 1255T736 1139T689 936T633 628Q574 293 510 -5T410 -437T355 -629Q278 -862 165 -862Q125 -862 92 -831T55 -746Q55 -711 74 -698T112 -685Q133 -685 150 -700T167 -741Q167 -789 114 -798Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMATHI-62\" d=\"M73 647Q73 657 77 670T89 683Q90 683 161 688T234 694Q246 694 246 685T212 542Q204 508 195 472T180 418L176 399Q176 396 182 402Q231 442 283 442Q345 442 383 396T422 280Q422 169 343 79T173 -11Q123 -11 82 27T40 150V159Q40 180 48 217T97 414Q147 611 147 623T109 637Q104 637 101 637H96Q86 637 83 637T76 640T73 647ZM336 325V331Q336 405 275 405Q258 405 240 397T207 376T181 352T163 330L157 322L136 236Q114 150 114 114Q114 66 138 42Q154 26 178 26Q211 26 245 58Q270 81 285 114T318 219Q336 291 336 325Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMATHI-61\" d=\"M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMATHI-78\" d=\"M52 289Q59 331 106 386T222 442Q257 442 286 424T329 379Q371 442 430 442Q467 442 494 420T522 361Q522 332 508 314T481 292T458 288Q439 288 427 299T415 328Q415 374 465 391Q454 404 425 404Q412 404 406 402Q368 386 350 336Q290 115 290 78Q290 50 306 38T341 26Q378 26 414 59T463 140Q466 150 469 151T485 153H489Q504 153 504 145Q504 144 502 134Q486 77 440 33T333 -11Q263 -11 227 52Q186 -10 133 -10H127Q78 -10 57 16T35 71Q35 103 54 123T99 143Q142 143 142 101Q142 81 130 66T107 46T94 41L91 40Q91 39 97 36T113 29T132 26Q168 26 194 71Q203 87 217 139T245 247T261 313Q266 340 266 352Q266 380 251 392T217 404Q177 404 142 372T93 290Q91 281 88 280T72 278H58Q52 284 52 289Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMAIN-32\" d=\"M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMAIN-2B\" d=\"M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMAIN-28\" d=\"M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMAIN-73\" d=\"M295 316Q295 356 268 385T190 414Q154 414 128 401Q98 382 98 349Q97 344 98 336T114 312T157 287Q175 282 201 278T245 269T277 256Q294 248 310 236T342 195T359 133Q359 71 321 31T198 -10H190Q138 -10 94 26L86 19L77 10Q71 4 65 -1L54 -11H46H42Q39 -11 33 -5V74V132Q33 153 35 157T45 162H54Q66 162 70 158T75 146T82 119T101 77Q136 26 198 26Q295 26 295 104Q295 133 277 151Q257 175 194 187T111 210Q75 227 54 256T33 318Q33 357 50 384T93 424T143 442T187 447H198Q238 447 268 432L283 424L292 431Q302 440 314 448H322H326Q329 448 335 442V310L329 304H301Q295 310 295 316Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMAIN-69\" d=\"M69 609Q69 637 87 653T131 669Q154 667 171 652T188 609Q188 579 171 564T129 549Q104 549 87 564T69 609ZM247 0Q232 3 143 3Q132 3 106 3T56 1L34 0H26V46H42Q70 46 91 49Q100 53 102 60T104 102V205V293Q104 345 102 359T88 378Q74 385 41 385H30V408Q30 431 32 431L42 432Q52 433 70 434T106 436Q123 437 142 438T171 441T182 442H185V62Q190 52 197 50T232 46H255V0H247Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMAIN-6E\" d=\"M41 46H55Q94 46 102 60V68Q102 77 102 91T102 122T103 161T103 203Q103 234 103 269T102 328V351Q99 370 88 376T43 385H25V408Q25 431 27 431L37 432Q47 433 65 434T102 436Q119 437 138 438T167 441T178 442H181V402Q181 364 182 364T187 369T199 384T218 402T247 421T285 437Q305 442 336 442Q450 438 463 329Q464 322 464 190V104Q464 66 466 59T477 49Q498 46 526 46H542V0H534L510 1Q487 2 460 2T422 3Q319 3 310 0H302V46H318Q379 46 379 62Q380 64 380 200Q379 335 378 343Q372 371 358 385T334 402T308 404Q263 404 229 370Q202 343 195 315T187 232V168V108Q187 78 188 68T191 55T200 49Q221 46 249 46H265V0H257L234 1Q210 2 183 2T145 3Q42 3 33 0H25V46H41Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMAIN-30\" d=\"M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMAIN-29\" d=\"M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z\"></path> <path stroke-width=\"1\" id=\"E1-MJSZ1-221A\" d=\"M263 249Q264 249 315 130T417 -108T470 -228L725 302Q981 837 982 839Q989 850 1001 850Q1008 850 1013 844T1020 832V826L741 243Q645 43 540 -176Q479 -303 469 -324T453 -348Q449 -350 436 -350L424 -349L315 -96Q206 156 205 156L171 130Q138 104 137 104L111 130L263 249Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMAIN-2217\" d=\"M229 286Q216 420 216 436Q216 454 240 464Q241 464 245 464T251 465Q263 464 273 456T283 436Q283 419 277 356T270 286L328 328Q384 369 389 372T399 375Q412 375 423 365T435 338Q435 325 425 315Q420 312 357 282T289 250L355 219L425 184Q434 175 434 161Q434 146 425 136T401 125Q393 125 383 131T328 171L270 213Q283 79 283 63Q283 53 276 44T250 35Q231 35 224 44T216 63Q216 80 222 143T229 213L171 171Q115 130 110 127Q106 124 100 124Q87 124 76 134T64 161Q64 166 64 169T67 175T72 181T81 188T94 195T113 204T138 215T170 230T210 250L74 315Q65 324 65 338Q65 353 74 363T98 374Q106 374 116 368T171 328L229 286Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMATHI-63\" d=\"M34 159Q34 268 120 355T306 442Q362 442 394 418T427 355Q427 326 408 306T360 285Q341 285 330 295T319 325T330 359T352 380T366 386H367Q367 388 361 392T340 400T306 404Q276 404 249 390Q228 381 206 359Q162 315 142 235T121 119Q121 73 147 50Q169 26 205 26H209Q321 26 394 111Q403 121 406 121Q410 121 419 112T429 98T420 83T391 55T346 25T282 0T202 -11Q127 -11 81 37T34 159Z\"></path> <path stroke-width=\"1\" id=\"E1-MJMATHI-64\" d=\"M366 683Q367 683 438 688T511 694Q523 694 523 686Q523 679 450 384T375 83T374 68Q374 26 402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487H491Q506 153 506 145Q506 140 503 129Q490 79 473 48T445 8T417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157Q33 205 53 255T101 341Q148 398 195 420T280 442Q336 442 364 400Q369 394 369 396Q370 400 396 505T424 616Q424 629 417 632T378 637H357Q351 643 351 645T353 664Q358 683 366 683ZM352 326Q329 405 277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q233 26 290 98L298 109L352 326Z\"></path> </defs> <g stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" transform=\"matrix(1 0 0 -1 0 0)\" aria-hidden=\"true\"> <use xlink:href=\"#E1-MJMATHI-45\" x=\"0\" y=\"0\"></use> <use xlink:href=\"#E1-MJMAIN-3D\" x=\"1042\" y=\"0\"></use> <g transform=\"translate(2098,0)\"> <use xlink:href=\"#E1-MJSZ2-222B\" x=\"0\" y=\"0\"></use> <use transform=\"scale(0.707)\" xlink:href=\"#E1-MJMATHI-62\" x=\"1500\" y=\"1540\"></use> <use transform=\"scale(0.707)\" xlink:href=\"#E1-MJMATHI-61\" x=\"787\" y=\"-1270\"></use> </g> <g transform=\"translate(3563,0)\"> <g transform=\"translate(286,0)\"> <rect stroke=\"none\" width=\"6999\" height=\"60\" x=\"0\" y=\"220\"></rect> <g transform=\"translate(60,859)\"> <use xlink:href=\"#E1-MJSZ1-221A\" x=\"0\" y=\"10\"></use> <rect stroke=\"none\" width=\"5879\" height=\"60\" x=\"1000\" y=\"801\"></rect> <g transform=\"translate(1000,0)\"> <use xlink:href=\"#E1-MJMATHI-78\" x=\"0\" y=\"0\"></use> <use transform=\"scale(0.707)\" xlink:href=\"#E1-MJMAIN-32\" x=\"809\" y=\"408\"></use> <use xlink:href=\"#E1-MJMAIN-2B\" x=\"1248\" y=\"0\"></use> <use xlink:href=\"#E1-MJMAIN-28\" x=\"2249\" y=\"0\"></use> <g transform=\"translate(2638,0)\"> <use xlink:href=\"#E1-MJMAIN-73\"></use> <use xlink:href=\"#E1-MJMAIN-69\" x=\"394\" y=\"0\"></use> <use xlink:href=\"#E1-MJMAIN-6E\" x=\"673\" y=\"0\"></use> </g> <g transform=\"translate(4035,0)\"> <use xlink:href=\"#E1-MJMAIN-32\"></use> <use xlink:href=\"#E1-MJMAIN-30\" x=\"500\" y=\"0\"></use> </g> <g transform=\"translate(5036,0)\"> <use xlink:href=\"#E1-MJMAIN-29\" x=\"0\" y=\"0\"></use> <use transform=\"scale(0.707)\" xlink:href=\"#E1-MJMAIN-32\" x=\"550\" y=\"408\"></use> </g> </g> </g> <g transform=\"translate(1698,-715)\"> <use xlink:href=\"#E1-MJMATHI-62\" x=\"0\" y=\"0\"></use> <use xlink:href=\"#E1-MJMAIN-2217\" x=\"651\" y=\"0\"></use> <use xlink:href=\"#E1-MJMATHI-78\" x=\"1374\" y=\"0\"></use> <use xlink:href=\"#E1-MJMAIN-2B\" x=\"2169\" y=\"0\"></use> <use xlink:href=\"#E1-MJMATHI-63\" x=\"3169\" y=\"0\"></use> </g> </g> </g> <use xlink:href=\"#E1-MJMATHI-64\" x=\"10969\" y=\"0\"></use> <use xlink:href=\"#E1-MJMATHI-78\" x=\"11493\" y=\"0\"></use> </g> </svg>'
        },
        settings: {
            selectedTopis: 'Derivatives',
            difficulty: 'Easy'
        }
    };

    changeState = () => {
        if(this.state.menu === 'slide-in'){
            this.setState({menu: 'slide-out'});
        }else{
            this.setState({menu: 'slide-in'});
        }
    };

    changeDifficulty = () => {
        if(this.state.settings.difficulty === "Easy"){
            this.setState({
                settings: {
                    difficulty: "Medium",
                    selectedTopis: this.state.settings.selectedTopis
                }
            });
        }else if(this.state.settings.difficulty === "Medium"){
            this.setState({
                settings: {
                    difficulty: "Hard",
                    selectedTopis: this.state.settings.selectedTopis
                }
            });
        }else{
            this.setState({
                settings: {
                    difficulty: "Easy",
                    selectedTopis: this.state.settings.selectedTopis
                }
            });
        }
    };

  render() {
      var fadeInStyling = animation;
      console.log(this.state.currentProblem.svg);

      if(this.state.menu === 'slide-in'){
          fadeInStyling = animation.fadeIn;
      }else{
          fadeInStyling = animation.fadeOut;
      }

    return (
      <div className={classes}>
        <NavMenu show={this.state.menu} topicsList={this.state.topicsList}/>
        <main className={fadeInStyling}>
            <Heading title="ProblemGenerator.net" pageTitle={this.state.settings.selectedTopis} click={this.changeState}/>
            <ProblemArea
                number={23}
                problem={this.state.currentProblem.svg}
                problemDescription={this.state.currentProblem.description}
                difficulty={this.state.settings.difficulty}
                difficultyChanger={this.changeDifficulty}
            />
        </main>
      </div>
    );
  }
}

export default App;