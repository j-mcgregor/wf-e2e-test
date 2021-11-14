const newsHits = [
  {
    url: 'https://www.edinburghnews.scotsman.com/whats-on/things-to-do/win-with-scottish-seabird-centre-this-summer-3293799',
    source: 'edinburghnews.scotsman.com',
    authors: ['By The Newsroom'],
    title: 'Win with Scottish Seabird Centre this summer',
    pubDate: '2021-07-02T06:51:37+00:00',
    country: '',
    language: 'en',
    description: 'Win with Scottish Seabird Centre this summer  Edinburgh News',
    imageUrl:
      'https://www.edinburghnews.scotsman.com/webimg/b25lY21zOmM2YWNjYWUyLTU0YmEtNDgzNi05YzE3LTIzNDkyZThjMzhiOTo2NzgxZmFhMS03ZGVkLTQ3ZTEtYWJjYi1jZGNhYzE0ZjNkMmQ=.jpg?width=2048&enable=upscale',
    content:
      'Visit the five-star Scottish Seabird Centre, a leading conservation and education charity located in the stunning coastal town of North Berwick, less than an hour’s drive from Edinburgh. To celebrate the launch of an amazing summer programme of event ... [+2455 chars]'
  },
  {
    url: 'https://www.heraldlive.co.za/news/2021-08-23-seabird-centre-needs-volunteers-to-help-manage-penguin-influx/',
    source: 'heraldlive.co.za',
    authors: ['GUY ROGERS'],
    title: 'Seabird centre needs volunteers to help manage penguin influx',
    pubDate: '2021-08-23T03:57:01+00:00',
    country: '',
    language: 'en',
    description:
      'Seabird centre needs volunteers to help manage penguin influx  HeraldLIVE',
    imageUrl:
      'https://lh3.googleusercontent.com/0591p_hZQrFjr0rgzXIvJJa4dv2A7ImuQGBq5CCyk33hUBDaDbYjjIwHEzWh_c-3KRAg0FHt4WBgMjxka34LNBbmsKRi0aAGsQnAWKs=s1000',
    content:
      'Seabird centre needs volunteers to help manage penguin influx\n\nGqeberha’s seabird rescue centre is calling for volunteers to help manage a mass influx of emaciated African penguins that have been rescued from Bird Island for emergency care at the cen ... [+230 chars]'
  },
  {
    url: 'https://www.thecourier.co.uk/fp/news/local/fife/2301883/how-can-scottish-government-stop-eu-boats-hoovering-up-sand-eel-off-fife-coast-and-harming-regions-vulnerable-seabird-colonies/',
    source: 'thecourier.co.uk',
    authors: ['Peter John Meiklem'],
    title:
      'How can Scottish Government stop EU boats ‘hoovering up’ sand eel off Fife coast and harming region’s vulnerable seabird colonies?',
    pubDate: '2021-06-13T06:30:00+00:00',
    country: 'gb',
    language: 'en',
    description:
      'How can Scottish Government stop EU boats ‘hoovering up’ sand eel off Fife coast and harming region’s vulnerable seabird colonies?  The Courier',
    imageUrl:
      'https://www.thecourier.co.uk/wp-content/uploads/sites/12/2021/06/KittiwakeBackground-3.jpg',
    content:
      'Danish and Swedish boats could be stopped from “industrial” sand eel fishing off the Scottish coast under new Scottish Government measures.\n\nRural affairs secretary and Angus MSP Mairi Gougeon has told her civil service team to draw up “management me ... [+2952 chars]'
  },
  {
    url: 'https://www.bbc.com/news/uk-scotland-tayside-central-58414580',
    source: 'bbc.com',
    authors: ['BBC News'],
    title: 'Breeding seabird numbers in Scotland almost halved since 1980s',
    pubDate: '2021-09-03T11:40:02+00:00',
    country: 'gb',
    language: 'en',
    description:
      'Breeding seabird numbers in Scotland almost halved since 1980s  BBC News',
    imageUrl:
      'https://ichef.bbci.co.uk/news/1024/branded_news/F7BA/production/_120381436_mediaitem103201195.jpg',
    content:
      '"The Scottish government\'s forthcoming Scottish seabird conservation strategy will be a crucial step in shedding more light on the pressures and threats that our seabirds face and setting out action to help secure their future."'
  },
  {
    url: 'https://www.scotsman.com/news/environment/climate-change-blamed-for-scotland-seabird-breeding-numbers-falling-by-almost-50-3370421',
    source: 'scotsman.com',
    authors: ['Neil Pooran'],
    title:
      'Climate change blamed for Scotland seabird breeding numbers falling by almost 50%',
    pubDate: '2021-09-03T13:28:05+00:00',
    country: '',
    language: 'en',
    description:
      'Climate change blamed for Scotland seabird breeding numbers falling by almost 50%  The Scotsman',
    imageUrl:
      'https://www.scotsman.com/webimg/b25lY21zOjU2YThiZjM4LTMxM2UtNDA1MS1hYzgxLWIxZGNkM2FmZDIwZTo2OTIwZjU5Ny00NGU2LTQ3OWEtOTYxMC1hNjI0YTZkMDRmYjY=.jpg?width=2048&enable=upscale',
    content:
      'The report produced by Scottish Government agency NatureScot also cited invasive non-native species as a key reason behind the decline.\n\nDrawing on data from the UK seabird monitoring programme, which looked at breeding numbers for 11 species, number ... [+2076 chars]'
  },
  {
    url: 'https://www.myjobscotland.gov.uk/organisations/scottish-arbitration-centre',
    source: 'myjobscotland.gov.uk',
    authors: ['myjobscotland'],
    title: 'Scottish Arbitration Centre Jobs | myjobscotland',
    pubDate: '2021-08-18T05:05:05+00:00',
    country: 'gb',
    language: 'en',
    description:
      'Scottish Arbitration Centre Jobs | myjobscotland  myjobscotland.gov.uk',
    imageUrl:
      'https://admin.myjobscotland.gov.uk/sites/default/files/styles/header/public/2021-08/Castle%20view%20from%20Terrace%20and%20Binnie%20Room.jpg?itok=7FYEZYSt',
    content:
      'The Scottish Arbitration Centre, established in 2011, promotes the use of arbitration within Scotland and the designation of Scotland as an arbitral seat to the rest of the world. A key to the proliferation of Scottish arbitration is the Arbitration  ... [+307 chars]'
  },
  {
    url: 'https://www.finanzen.ch/nachrichten/aktien/ausblick-seabird-exploration-praesentiert-quartalsergebnisse-1030456953',
    source: 'finanzen.ch',
    authors: [],
    title: 'Ausblick: SeaBird Exploration präsentiert Quartalsergebnisse',
    pubDate: '2021-05-23T05:01:14+00:00',
    country: 'ch',
    language: 'de',
    description:
      'Ausblick: SeaBird Exploration präsentiert Quartalsergebnisse  finanzen.ch',
    imageUrl: '',
    content:
      'SeaBird Exploration wird am 25.05.2021 das Zahlenwerk zum am 31.03.2021 abgelaufenen Jahresviertel vorstellen.\n\nIn Sachen EPS geht 1 Analyst von einem Verlust von -0,080 USD je Aktie aus. Im vergangenen Jahr hatte SeaBird Exploration noch 0,043 USD j ... [+539 chars]'
  },
  {
    url: 'https://www.sunshinecoastdaily.com.au/news/20k-donations-fly-in-for-twinnies-seabird-rescues/4241416/',
    source: 'sunshinecoastdaily.com.au',
    authors: ['Peter Gardiner'],
    title: '$20K donations fly in for Twinnies seabird rescues',
    pubDate: '2021-04-20T03:01:00+00:00',
    country: 'au',
    language: 'en',
    description:
      '$20K donations fly in for Twinnies seabird rescues  Sunshine Coast Daily',
    imageUrl:
      'https://media.apnarm.net.au/media/images/2021/04/20/v3imagesbinc6d68dde8444252e53fef59b2262ac1f-y5ntk8q6e32rfuga8w2_ct1880x930.jpg',
    content:
      'The Twinnies working on an injured pelican at their Lansborough seabird rescue centre.\n\nThe Twinnies working on an injured pelican at their Lansborough seabird rescue centre.\n\nA determination for saving seabirds bred amazingly into Sunshine Beach ide ... [+2402 chars]'
  },
  {
    url: 'https://www.pressandjournal.co.uk/fp/news/aberdeen-aberdeenshire/3521208/algae-blooms-investigated-as-potential-mass-seabird-deaths-cause/',
    source: 'pressandjournal.co.uk',
    authors: ['Kieran Beattie'],
    title: 'Algae blooms investigated as potential mass seabird deaths cause',
    pubDate: '2021-10-10T05:00:00+00:00',
    country: 'gb',
    language: 'en',
    description:
      'Algae blooms investigated as potential mass seabird deaths cause  Press and Journal',
    imageUrl:
      'https://www.pressandjournal.co.uk/wp-content/uploads/sites/54/2021/10/Guillemot.jpg',
    content:
      'Blooms of toxic algae in the North Sea are being investigated as one potential cause behind the “dreadful” death of thousands of seabirds along the east coast.\n\nSince August, beach-goers have come across alarmingly high numbers of dead or dying seabi ... [+4646 chars]'
  },
  {
    url: 'https://www.thecourier.co.uk/fp/news/local/perth-kinross/2302834/huge-fire-at-scottish-crannog-centre/',
    source: 'thecourier.co.uk',
    authors: ['Richard Rooney'],
    title: 'Huge fire at Scottish Crannog Centre',
    pubDate: '2021-06-11T23:37:00+00:00',
    country: 'gb',
    language: 'en',
    description: 'Huge fire at Scottish Crannog Centre  The Courier',
    imageUrl:
      'https://www.thecourier.co.uk/wp-content/uploads/sites/12/2021/04/The-Courier-Holding-Image.jpg',
    content:
      'The Scottish Crannog Centre near Kenmore appears to have been all but destroyed in a devastating fire.\n\nImages from the scene show the wooden building – created as a replica of an Iron Age water dwelling – consumed by flames late on Friday evening.\n\n ... [+405 chars]'
  }
];

export default newsHits;
