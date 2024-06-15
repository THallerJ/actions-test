import {
  Home,
  Login,
  MyTabs,
  TabEditor,
  HomeMobile,
  MyTabsMobile,
  TabEditorMobile,
} from '../../pages';

type Auth1Fixtures = {
  home: Home;
  homeMobile: HomeMobile;
  myTabs: MyTabs;
  myTabsMobile: MyTabsMobile;
  tabEditor: TabEditor;
  tabEditorMobile: TabEditorMobile;
};

type Auth2Fixtures = {
  homeAlt: Home;
  homeMobileAlt: HomeMobile;
  myTabsAlt: MyTabs;
  myTabsMobileAlt: MyTabsMobile;
  tabEditorAlt: TabEditor;
  tabEditorMobileAlt: TabEditorMobile;
};

type NoAuthFixtures = {
  login: Login;
  homeNoAuth: Home;
  homeMobileNoAuth: HomeMobile;
  myTabsNoAuth: MyTabs;
  myTabsMobileNoAuth: MyTabsMobile;
  tabEditorNoAuth: TabEditor;
  tabEditorMobileNoAuth: TabEditorMobile;
};

export type { Auth1Fixtures, NoAuthFixtures, Auth2Fixtures };
