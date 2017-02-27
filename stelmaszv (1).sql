-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql.cba.pl
-- Czas generowania: 06 Paź 2016, 15:10
-- Wersja serwera: 10.0.27-MariaDB-1
-- Wersja PHP: 7.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `stelmaszv`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `b.admin`
--

CREATE TABLE `b.admin` (
  `id` int(11) NOT NULL,
  `login` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `b.admin`
--

INSERT INTO `b.admin` (`id`, `login`, `password`) VALUES
(1, 'admin', '202cb962ac59075b964b07152d234b70');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `b.content`
--

CREATE TABLE `b.content` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `content` text NOT NULL,
  `photo` varchar(250) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `b.content`
--

INSERT INTO `b.content` (`id`, `name`, `content`, `photo`, `type`) VALUES
(1, 'fajne', 'fajne', 'galery/e5065e6d540108409d9e501ed1c1a7ac.jpg', ''),
(2, '<div id="main_info">Dane Kontaktowe</div>\n			<div id="owner">WÅ‚asciciel:Åukasz Murawski</div>\n			<div id="place">Miejscowsc: Åowicz</div>\n			<div id="Adres">Adress:     DÄ…bowice Dolne 50</div>\n			<div id="code_post">Kod Pocztowy :99-400</div>\n			', '<div id="main_info">Dane Kontaktowe</div>\n			<div id="owner">WÅ‚asciciel:Åukasz Murawski</div>\n			<div id="place">Miejscowsc: Åowicz</div>\n			<div id="Adres">Adress:     DÄ…bowice Dolne 50</div>\n			<div id="code_post">Kod Pocztowy :99-400</div>\n			<div id="emil">E-mail :lukasz@;ukszasz.pl</div>\n			<div id="phone">Telefon :777 xxx xxx</div> ', '', ''),
(3, 'grwg', 'gjgjgjgtwth', '', 'servment'),
(4, 'reqrqr', 'rgqrgqrgq', '', 'servment'),
(5, 'rgqrgq', 'qrgqrgg', '', 'servment');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `b.galery`
--

CREATE TABLE `b.galery` (
  `id` int(11) NOT NULL,
  `sorce` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `b.galery`
--

INSERT INTO `b.galery` (`id`, `sorce`, `type`) VALUES
(1, 'baner/6e323c36bf178ab5b04d22e1d6cbcf2d.png\r\n', 'baner'),
(2, 'galery/84304e2065b71e596feac8b57d9c5130.jpg', '0'),
(3, 'galery/957526fa2f6f64bcbdb98fe5234e97b5.jpg', '0');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `b.mesages`
--

CREATE TABLE `b.mesages` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `subject` varchar(250) NOT NULL,
  `contents` text NOT NULL,
  `phone_form` int(11) NOT NULL,
  `emial` varchar(250) NOT NULL,
  `time` int(11) NOT NULL,
  `reed` int(11) NOT NULL,
  `type` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `b.mesages`
--

INSERT INTO `b.mesages` (`id`, `name`, `subject`, `contents`, `phone_form`, `emial`, `time`, `reed`, `type`) VALUES
(2, 'GQRGQRGQRG', 'Pytanie o UsÅ‚ugÄ™', 'GQRGQRGQRG', 431414, 'FQGQ@QEEQE.COM', 1472554676, 1, 'received'),
(6, 'hethteh', 'Inne', 'ehethtetet', 41414, 'rqrqr@eqew.fwt', 1475591563, 1, 'received'),
(7, 'twrtrwtrwtwrtwrtw', 'Pytanie o Wycene', 'wrtwrtrwtwrtrwt', 52525, 'eqeqwe@eqeqwe.dq', 1475591615, 1, 'received'),
(5, 'Åukasz Murawski', 'Odp : eh - <spam id=sennt>wysÅ‚no</spam>', 'yrurururutjtj', 777, 'L.murawski@budinox.com', 1475591361, 1, 'sennt'),
(8, 'hethtehteh', 'Wycena', 'htehethrwrw', 2147483647, 'qfqef@eqewf.pl', 1475591757, 1, 'received'),
(9, 'Åukasz Murawski', 'Odp : Wycena - <spam id=sennt>wysÅ‚no</spam>', 'tktuktuktuktuktuktuk', 777, 'L.murawski@budinox.com', 1475591774, 1, 'sennt'),
(10, 'eyjeyjyejyejyejyej', 'Usluga', 'ehtejeyjyejyejeyj', 562525262, 'gqgwqrg@qqfqef.pl', 1475591807, 1, 'received'),
(11, 'Åukasz Murawski', 'Odp : Usluga - <spam id=sennt>wysÅ‚no</spam>', 'gehejyjejeyjyejeyj', 777, 'L.murawski@budinox.com', 1475591817, 1, 'sennt');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `b.oner`
--

CREATE TABLE `b.oner` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phon` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `b.oner`
--

INSERT INTO `b.oner` (`id`, `name`, `email`, `phon`) VALUES
(1, 'luksza murawski', 'sdqwqd@gmial.com', 1233155);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `b.slide`
--

CREATE TABLE `b.slide` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `photo` varchar(250) NOT NULL,
  `div` varchar(10) NOT NULL,
  `div_text` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `b.slide`
--

INSERT INTO `b.slide` (`id`, `text`, `photo`, `div`, `div_text`) VALUES
(1, 'fjna firma', 'baner/6e323c36bf178ab5b04d22e1d6cbcf2d.png', 'slides_01', 'slide_text'),
(2, 'fjna firma', 'baner/6e323c36bf178ab5b04d22e1d6cbcf2d.png', 'slides_02', 'slide_text2'),
(3, 'qgfgqg', 'baner/6e323c36bf178ab5b04d22e1d6cbcf2d.png', 'slides_03', 'slide_text3'),
(4, 'tgwqgrw', 'baner/6e323c36bf178ab5b04d22e1d6cbcf2d.png', 'slides_04', 'slide_text4');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sbaytime`
--

CREATE TABLE `sbaytime` (
  `id` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `sbaytime`
--

INSERT INTO `sbaytime` (`id`, `id_prod`, `time`, `count`) VALUES
(161, 5, 1475154131, 1),
(160, 4, 1475154131, 1),
(159, 3, 1475154131, 1),
(158, 2, 1475154131, 1),
(157, 1, 1475154131, 1),
(156, 2, 1474892181, 1),
(155, 1, 1474892181, 1),
(154, 5, 1474885079, 1),
(153, 4, 1474885079, 1),
(152, 3, 1474885079, 1),
(151, 2, 1474885079, 1),
(150, 1, 1474885079, 1),
(149, 1, 1474642476, 1),
(162, 1, 1475317164, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `scategory`
--

CREATE TABLE `scategory` (
  `id` int(11) NOT NULL,
  `catname` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `scategory`
--

INSERT INTO `scategory` (`id`, `catname`) VALUES
(1, 'Gry Konslowe'),
(2, 'zwierzaki'),
(3, 'komputery');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sopinion`
--

CREATE TABLE `sopinion` (
  `id` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `text` text CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `value` int(11) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `sopinion`
--

INSERT INTO `sopinion` (`id`, `id_prod`, `id_user`, `text`, `value`, `time`) VALUES
(9, 1, 39, 'eqe', 7, 1475317539),
(8, 1, 39, 'ethet', 6, 1475242112),
(35, 5, 39, 'dobra gra', 10, 1475759206),
(34, 4, 39, 'Jednak fajny ten rudzielec', 5, 1475759191),
(33, 3, 39, 'Bardzo śliczny i fajny kot', 6, 1475759147),
(32, 2, 39, 'fajna gra', 7, 1475759124);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sorders`
--

CREATE TABLE `sorders` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `pruducts` text CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `updata` int(11) NOT NULL,
  `stan` int(11) NOT NULL,
  `paid` int(11) NOT NULL,
  `purchaser` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `sent` varchar(50) NOT NULL,
  `diiverchused` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `sorders`
--

INSERT INTO `sorders` (`id`, `id_user`, `time`, `pruducts`, `updata`, `stan`, `paid`, `purchaser`, `total`, `sent`, `diiverchused`) VALUES
(66, 39, 1475154131, '[{"id":"1","name":"Uncharted","price":"255","time":"14","photo":"photo\\/uncharted.jpg","id_prod":"1","selled":"49","recomended":"0","stancount":"6","accessiblelevel":"0","rating":"10","id_promotion":"0","promotion_stan":"yes","promotion_recommended":"no","procentptomo":"40","newprice":"123","description_info":"  <table class=\\"table table-responsive pull-left\\" xss=removed>\\r\\n          <tr>\\r\\n           <td class=\\"active\\">Gatunek<\\/td>\\r\\n           <td class=\\"info\\">Przygoda Akcjia<\\/td>\\r\\n          <\\/tr>\\r\\n          <tr>\\r\\n           <td class=\\"active\\">Tryb Wieloosobowy<\\/td>\\r\\n           <td class=\\"success\\">tak<\\/td>\\r\\n          <\\/tr>\\r\\n          <tr>\\r\\n           <td class=\\"active\\">Platformy<\\/td>\\r\\n           <td class=\\"info\\">PS3<\\/td>\\r\\n          <\\/tr>\\r\\n          <tr>\\r\\n           <td class=\\"active\\">Wersjia Polska<\\/td>\\r\\n           <td class=\\"success\\">tak<\\/td>\\r\\n          <\\/tr>\\r\\n          <tr>\\r\\n           <td class=\\"active\\">Kontroler Muve<\\/td>\\r\\n           <td class=\\"danger\\">Nie<\\/td>\\r\\n          <\\/tr>\\r\\n         <\\/table>","disrption":"<h2>Uncharted: Fortuna Drake\\u2019a<\\/h2>\\r\\n              <div><img src=\\"photo\\/1\\/maxresdefault.jpg\\" class=\\"img-thumbnail photo_left pull-left\\"><\\/div>\\r\\n              <div class=\\"discription\\">Gra zdoby?a uznanie w?r\\u00f3d krytyk\\u00f3w, osi?gaj?c ?redni? ocen 89,70% oraz 88\\/100 odpowiednio w agregatorach GameRankings i Metacritic. Recenzenci zachwalali jej lekki, hollywoodzki klimat, przywodz?cy na my?l filmy z serii Indiana Jones, dialogi, obsad? g?osow?, grafik? i muzyk?. Ponadto zdoby?a wiele nagr\\u00f3d presti?owych magazyn\\u00f3w i portali o grach komputerowych m.in. 2007 PS3 Game Of The Year oraz 2007 Best Action Game serwisu IGN. W ci?gu dziesi?ciu tygodni Uncharted: Drake\'s Fortune sprzeda?a si? w liczbie ponad miliona egzemplarzy. W pa?dzierniku 2009 roku ukaza?a si? kontynuacja gry pod tytu?em: Uncharted 2: Po?r\\u00f3d z?odziei, a w listopadzie 2011 roku cz??? trzecia zatytu?owana Uncharted 3: Oszustwo Drake\\u2019a.Gra zdoby?a uznanie w?r\\u00f3d krytyk\\u00f3w, osi?gaj?c ?redni? ocen 89,70% oraz 88\\/100 odpowiednio w agregatorach GameRankings i Metacritic. Recenzenci zachwalali jej lekki, hollywoodzki klimat, przywodz?cy na my?l filmy z serii Indiana Jones, dialogi, obsad? g?osow?, grafik? i muzyk?. Ponadto zdoby?a wiele nagr\\u00f3d presti?owych magazyn\\u00f3w i portali o grach komputerowych m.in. 2007 PS3 Game Of The Year oraz 2007 Best Action Game serwisu IGN. W ci?gu dziesi?ciu tygodni Uncharted: Drake\'s Fortune sprzeda?a si? w liczbie ponad miliona egzemplarzy. W pa?dzierniku 2009 roku ukaza?a si? kontynuacja gry pod tytu?em: Uncharted 2: Po?r\\u00f3d z?odziei, a w listopadzie 2011 roku cz??? trzecia zatytu?owana Uncharted 3: Oszustwo Drake\\u2019a.<\\/div>","TAG":"Efektowna gra Akcji PS3 Uncharted","id_category":"1","id_subcategory":"1","catname":"Gry Konslowe","id_miancat":"1","subname":"PS3","qty":"1"},{"id":"1","name":"God of war","price":"211","time":"313","photo":"","id_prod":"2","selled":"39","recomended":"0","stancount":"29","accessiblelevel":"0","rating":"9","id_promotion":"0","promotion_stan":"no","promotion_recommended":"","procentptomo":"0","newprice":"0","description_info":"<div class=\\"table table-responsive\\" class=\\"row\\">\\r\\n           <div class=\\"active\\">Gatunek<\\/div>\\r\\n      <div class=\\"info\\">Przygoda Akcjia<\\/div>\\r\\n     <\\/div>","disrption":"0","TAG":"","id_category":"1","id_subcategory":"1","catname":"Gry Konslowe","id_miancat":"1","subname":"PS3","qty":"1"},{"id":"5","name":"Sliczny Kot","price":"219","time":"29","photo":"photo\\/dachwoiec.jpg\\r\\n","id_prod":"3","selled":"12","recomended":"313141515","stancount":"8","accessiblelevel":"0","rating":"7","id_promotion":"0","promotion_stan":"no","promotion_recommended":"no","procentptomo":"0","newprice":"0","description_info":"","disrption":"Fajny ma?y dachowiec","TAG":",sliczny,fajny,dachowiec,maly,","id_category":"2","id_subcategory":"5","catname":"zwierzaki","id_miancat":"2","subname":"Koty","qty":"1"},{"id":"5","name":"Rudy brzydal","price":"231","time":"0","photo":"photo\\/duy.jpeg","id_prod":"4","selled":"12","recomended":"0","stancount":"44","accessiblelevel":"3","rating":"5","id_promotion":"0","promotion_stan":"no","promotion_recommended":"no","procentptomo":"0","newprice":"0","description_info":"","disrption":"Brzydki kot","TAG":"rudzilec,rudy,brzydki,duzy","id_category":"2","id_subcategory":"5","catname":"zwierzaki","id_miancat":"2","subname":"Koty","qty":"1"},{"id":"1","name":"Uncharted 2","price":"132","time":"0","photo":"","id_prod":"5","selled":"12","recomended":"0","stancount":"49","accessiblelevel":"0","rating":"0","id_promotion":"0","promotion_stan":"no","promotion_recommended":"no","procentptomo":"0","newprice":"0","description_info":"","disrption":"","TAG":"Uncharted","id_category":"1","id_subcategory":"1","catname":"Gry Konslowe","id_miancat":"1","subname":"PS3","qty":"1"}]', 1475154131, 0, 0, 13, 919, 'bymyself', 'transfer'),
(67, 39, 1475317164, '[{"id":"1","name":"Uncharted","price":"255","added":"14","photo":"photo\\/uncharted.jpg","id_prod":"1","selled":"50","recomended":"0","stancount":"5","accessiblelevel":"0","rating":"10","id_promotion":"0","promotion_stan":"yes","promotion_recommended":"no","procentptomo":"40","newprice":"123","description_info":"  <table class=\\"table table-responsive pull-left\\" xss=removed>\\r\\n          <tr>\\r\\n           <td class=\\"active\\">Gatunek<\\/td>\\r\\n           <td class=\\"info\\">Przygoda Akcjia<\\/td>\\r\\n          <\\/tr>\\r\\n          <tr>\\r\\n           <td class=\\"active\\">Tryb Wieloosobowy<\\/td>\\r\\n           <td class=\\"success\\">tak<\\/td>\\r\\n          <\\/tr>\\r\\n          <tr>\\r\\n           <td class=\\"active\\">Platformy<\\/td>\\r\\n           <td class=\\"info\\">PS3<\\/td>\\r\\n          <\\/tr>\\r\\n          <tr>\\r\\n           <td class=\\"active\\">Wersjia Polska<\\/td>\\r\\n           <td class=\\"success\\">tak<\\/td>\\r\\n          <\\/tr>\\r\\n          <tr>\\r\\n           <td class=\\"active\\">Kontroler Muve<\\/td>\\r\\n           <td class=\\"danger\\">Nie<\\/td>\\r\\n          <\\/tr>\\r\\n         <\\/table>","disrption":"<h2>Uncharted: Fortuna Drake\\u2019a<\\/h2>\\r\\n              <div><img src=\\"photo\\/1\\/maxresdefault.jpg\\" class=\\"img-thumbnail photo_left pull-left\\"><\\/div>\\r\\n              <div class=\\"discription\\">Gra zdoby?a uznanie w?r\\u00f3d krytyk\\u00f3w, osi?gaj?c ?redni? ocen 89,70% oraz 88\\/100 odpowiednio w agregatorach GameRankings i Metacritic. Recenzenci zachwalali jej lekki, hollywoodzki klimat, przywodz?cy na my?l filmy z serii Indiana Jones, dialogi, obsad? g?osow?, grafik? i muzyk?. Ponadto zdoby?a wiele nagr\\u00f3d presti?owych magazyn\\u00f3w i portali o grach komputerowych m.in. 2007 PS3 Game Of The Year oraz 2007 Best Action Game serwisu IGN. W ci?gu dziesi?ciu tygodni Uncharted: Drake\'s Fortune sprzeda?a si? w liczbie ponad miliona egzemplarzy. W pa?dzierniku 2009 roku ukaza?a si? kontynuacja gry pod tytu?em: Uncharted 2: Po?r\\u00f3d z?odziei, a w listopadzie 2011 roku cz??? trzecia zatytu?owana Uncharted 3: Oszustwo Drake\\u2019a.Gra zdoby?a uznanie w?r\\u00f3d krytyk\\u00f3w, osi?gaj?c ?redni? ocen 89,70% oraz 88\\/100 odpowiednio w agregatorach GameRankings i Metacritic. Recenzenci zachwalali jej lekki, hollywoodzki klimat, przywodz?cy na my?l filmy z serii Indiana Jones, dialogi, obsad? g?osow?, grafik? i muzyk?. Ponadto zdoby?a wiele nagr\\u00f3d presti?owych magazyn\\u00f3w i portali o grach komputerowych m.in. 2007 PS3 Game Of The Year oraz 2007 Best Action Game serwisu IGN. W ci?gu dziesi?ciu tygodni Uncharted: Drake\'s Fortune sprzeda?a si? w liczbie ponad miliona egzemplarzy. W pa?dzierniku 2009 roku ukaza?a si? kontynuacja gry pod tytu?em: Uncharted 2: Po?r\\u00f3d z?odziei, a w listopadzie 2011 roku cz??? trzecia zatytu?owana Uncharted 3: Oszustwo Drake\\u2019a.<\\/div>","TAG":"Efektowna gra Akcji PS3 Uncharted","id_category":"1","id_subcategory":"1","catname":"Gry Konslowe","id_miancat":"1","subname":"PS3","qty":"1"}]', 1475317164, 0, 0, 13, 129, 'bymyself', 'reception');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sproducsstan`
--

CREATE TABLE `sproducsstan` (
  `id` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `selled` int(11) NOT NULL,
  `recomended` int(11) NOT NULL,
  `stancount` int(11) NOT NULL,
  `accessiblelevel` int(11) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `sproducsstan`
--

INSERT INTO `sproducsstan` (`id`, `id_prod`, `selled`, `recomended`, `stancount`, `accessiblelevel`, `rating`) VALUES
(1, 1, 51, 0, 4, 0, 10),
(2, 2, 40, 0, 28, 0, 9),
(3, 3, 13, 313141515, 7, 0, 7),
(4, 4, 13, 0, 43, 3, 5),
(5, 5, 13, 0, 48, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sproducts`
--

CREATE TABLE `sproducts` (
  `id` int(11) NOT NULL,
  `name` varchar(250) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `price` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  `photo` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `sproducts`
--

INSERT INTO `sproducts` (`id`, `name`, `price`, `added`, `photo`) VALUES
(1, 'Uncharted', 255, 14, 'photo/uncharted.jpg'),
(2, 'God of war', 211, 313, ''),
(3, 'Sliczny Kot', 219, 29, 'photo/dachwoiec.jpg\r\n'),
(4, 'Rudy brzydal', 231, 0, 'photo/duy.jpeg'),
(5, 'Uncharted 2', 132, 0, '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sproductscotegory`
--

CREATE TABLE `sproductscotegory` (
  `id` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `id_subcategory` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `sproductscotegory`
--

INSERT INTO `sproductscotegory` (`id`, `id_prod`, `id_category`, `id_subcategory`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 3, 2, 5),
(4, 4, 2, 5),
(5, 5, 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sproductsditels`
--

CREATE TABLE `sproductsditels` (
  `id` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `description_info` text CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `disrption` text CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `TAG` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `sproductsditels`
--

INSERT INTO `sproductsditels` (`id`, `id_prod`, `description_info`, `disrption`, `TAG`) VALUES
(1, 1, ' 	<table class="table table-responsive pull-left" style="width:600px;">\r\n       			<tr>\r\n       				<td class="active">Gatunek</td>\r\n       				<td class="info">Przygoda Akcjia</td>\r\n       			</tr>\r\n       			<tr>\r\n       				<td class="active">Tryb Wieloosobowy</td>\r\n       				<td class="success">tak</td>\r\n       			</tr>\r\n       			<tr>\r\n       				<td class="active">Platformy</td>\r\n       				<td class="info">PS3</td>\r\n       			</tr>\r\n       			<tr>\r\n       				<td class="active">Wersjia Polska</td>\r\n       				<td class="success">tak</td>\r\n       			</tr>\r\n       			<tr>\r\n       				<td class="active">Kontroler Muve</td>\r\n       				<td class="danger">Nie</td>\r\n       			</tr>\r\n       		</table>', '<h2>Uncharted: Fortuna Drake', 'Efektowna gra Akcji PS3 Uncharted'),
(2, 2, '<div class="table table-responsive" class="row">\r\n       			 <div class="active">Gatunek</div>\r\n  				<div class="info">Przygoda Akcjia</div>\r\n  			</div>', '', ''),
(3, 3, '', 'Fajny ma?y dachowiec', ',sliczny,fajny,dachowiec,maly,'),
(4, 4, '', 'Brzydki kot', 'rudzilec,rudy,brzydki,duzy'),
(5, 5, '', '', 'Uncharted');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sproductssetings`
--

CREATE TABLE `sproductssetings` (
  `id` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `id_promotion` int(11) NOT NULL,
  `promotion_stan` varchar(3) NOT NULL,
  `promotion_recommended` varchar(3) NOT NULL,
  `procentptomo` int(11) NOT NULL,
  `newprice` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `sproductssetings`
--

INSERT INTO `sproductssetings` (`id`, `id_prod`, `id_promotion`, `promotion_stan`, `promotion_recommended`, `procentptomo`, `newprice`) VALUES
(1, 1, 0, 'yes', 'no', 40, 123),
(2, 2, 0, 'no', '', 0, 0),
(3, 3, 0, 'no', 'no', 0, 0),
(4, 4, 0, 'no', 'no', 0, 0),
(5, 5, 0, 'no', 'no', 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ssubcategory`
--

CREATE TABLE `ssubcategory` (
  `id` int(11) NOT NULL,
  `id_miancat` int(11) NOT NULL,
  `subname` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `ssubcategory`
--

INSERT INTO `ssubcategory` (`id`, `id_miancat`, `subname`) VALUES
(1, 1, 'PS3'),
(3, 1, 'PC'),
(4, 1, 'PS2'),
(5, 2, 'Koty');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `suseresadmin`
--

CREATE TABLE `suseresadmin` (
  `id_admin` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `role` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `suseresadmin`
--

INSERT INTO `suseresadmin` (`id_admin`, `id_user`, `role`) VALUES
(1, 39, 'admin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `suseresadres`
--

CREATE TABLE `suseresadres` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `surname` varchar(250) NOT NULL,
  `adress` varchar(250) NOT NULL,
  `postCode` varchar(250) NOT NULL,
  `tele` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL,
  `region` varchar(250) NOT NULL,
  `chiused` varchar(3) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `suseresadres`
--

INSERT INTO `suseresadres` (`id`, `id_user`, `name`, `surname`, `adress`, `postCode`, `tele`, `city`, `region`, `chiused`) VALUES
(13, 39, 'Pani', 'Biedronka', 'biedrnkowata', '12134', '123456789', 'eqe', 'eqeqe', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `susers`
--

CREATE TABLE `susers` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `susers`
--

INSERT INTO `susers` (`id`, `login`, `password`, `email`) VALUES
(39, 'stelmaszv', '$2y$10$bAGlik8vqgSbdb7lt891NOhgkjko0rpuWpuaqO4l3i9Ow9y2o0uRK', 'stelmaszv@gmail.com');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `b.admin`
--
ALTER TABLE `b.admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `b.content`
--
ALTER TABLE `b.content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `b.galery`
--
ALTER TABLE `b.galery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `b.mesages`
--
ALTER TABLE `b.mesages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `b.oner`
--
ALTER TABLE `b.oner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `b.slide`
--
ALTER TABLE `b.slide`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sbaytime`
--
ALTER TABLE `sbaytime`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scategory`
--
ALTER TABLE `scategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sopinion`
--
ALTER TABLE `sopinion`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sorders`
--
ALTER TABLE `sorders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sproducsstan`
--
ALTER TABLE `sproducsstan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sproducts`
--
ALTER TABLE `sproducts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sproductscotegory`
--
ALTER TABLE `sproductscotegory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sproductsditels`
--
ALTER TABLE `sproductsditels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sproductssetings`
--
ALTER TABLE `sproductssetings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ssubcategory`
--
ALTER TABLE `ssubcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suseresadmin`
--
ALTER TABLE `suseresadmin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `suseresadres`
--
ALTER TABLE `suseresadres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `susers`
--
ALTER TABLE `susers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `b.admin`
--
ALTER TABLE `b.admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT dla tabeli `b.content`
--
ALTER TABLE `b.content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT dla tabeli `b.galery`
--
ALTER TABLE `b.galery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT dla tabeli `b.mesages`
--
ALTER TABLE `b.mesages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT dla tabeli `b.oner`
--
ALTER TABLE `b.oner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT dla tabeli `b.slide`
--
ALTER TABLE `b.slide`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT dla tabeli `sbaytime`
--
ALTER TABLE `sbaytime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;
--
-- AUTO_INCREMENT dla tabeli `scategory`
--
ALTER TABLE `scategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT dla tabeli `sopinion`
--
ALTER TABLE `sopinion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT dla tabeli `sorders`
--
ALTER TABLE `sorders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
--
-- AUTO_INCREMENT dla tabeli `sproducsstan`
--
ALTER TABLE `sproducsstan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT dla tabeli `sproducts`
--
ALTER TABLE `sproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT dla tabeli `sproductscotegory`
--
ALTER TABLE `sproductscotegory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT dla tabeli `sproductsditels`
--
ALTER TABLE `sproductsditels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT dla tabeli `sproductssetings`
--
ALTER TABLE `sproductssetings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT dla tabeli `ssubcategory`
--
ALTER TABLE `ssubcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT dla tabeli `suseresadmin`
--
ALTER TABLE `suseresadmin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT dla tabeli `suseresadres`
--
ALTER TABLE `suseresadres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT dla tabeli `susers`
--
ALTER TABLE `susers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
