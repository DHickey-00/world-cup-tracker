import React, { memo, useMemo, useState } from "react";
import "./styles.css";

const hexToRgba = (hex, alpha = 0.18) => {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const teamThemeSeeds = {
  FRA: { accent: "#0055A4", badgeBg: "#EF4135", badgeText: "#FFFFFF" },
  JPN: { accent: "#BC002D", badgeBg: "#FFFFFF", badgeText: "#BC002D" },
  SWE: { accent: "#006AA7", badgeBg: "#FECC00", badgeText: "#0F172A" },
  ALG: { accent: "#006233", badgeBg: "#D21034", badgeText: "#FFFFFF" },
  QAT: { accent: "#8A1538", badgeBg: "#FFFFFF", badgeText: "#8A1538" },
  JOR: { accent: "#007A3D", badgeBg: "#CE1126", badgeText: "#FFFFFF" },
  ENG: { accent: "#CE1126", badgeBg: "#FFFFFF", badgeText: "#111827" },
  NOR: { accent: "#BA0C2F", badgeBg: "#00205B", badgeText: "#FFFFFF" },
  SEN: { accent: "#00853F", badgeBg: "#FCD116", badgeText: "#111827" },
  HAI: { accent: "#00209F", badgeBg: "#D21034", badgeText: "#FFFFFF" },
  NZL: { accent: "#00247D", badgeBg: "#FFFFFF", badgeText: "#00247D" },
  GER: { accent: "#111111", badgeBg: "#FFCE00", badgeText: "#111827" },
  USA: { accent: "#3C3B6E", badgeBg: "#B22234", badgeText: "#FFFFFF" },
  SUI: { accent: "#D52B1E", badgeBg: "#FFFFFF", badgeText: "#D52B1E" },
  CZE: { accent: "#11457E", badgeBg: "#D7141A", badgeText: "#FFFFFF" },
  KOR: { accent: "#003478", badgeBg: "#C60C30", badgeText: "#FFFFFF" },
  KSA: { accent: "#006C35", badgeBg: "#FFFFFF", badgeText: "#006C35" },
  ESP: { accent: "#AA151B", badgeBg: "#F1BF00", badgeText: "#111827" },
  COL: { accent: "#FCD116", badgeBg: "#003893", badgeText: "#FFFFFF" },
  CRO: { accent: "#FF0000", badgeBg: "#FFFFFF", badgeText: "#FF0000" },
  GHA: { accent: "#CE1126", badgeBg: "#FCD116", badgeText: "#111827" },
  IRN: { accent: "#239F40", badgeBg: "#DA0000", badgeText: "#FFFFFF" },
  COD: { accent: "#00A3E0", badgeBg: "#EF3340", badgeText: "#FFFFFF" },
  BRA: { accent: "#009C3B", badgeBg: "#FFDF00", badgeText: "#111827" },
  MAR: { accent: "#C1272D", badgeBg: "#006233", badgeText: "#FFFFFF" },
  ECU: { accent: "#FCD116", badgeBg: "#003893", badgeText: "#FFFFFF" },
  PAR: { accent: "#D52B1E", badgeBg: "#0038A8", badgeText: "#FFFFFF" },
  RSA: { accent: "#007749", badgeBg: "#FFB612", badgeText: "#111827" },
  UZB: { accent: "#0099B5", badgeBg: "#1EB53A", badgeText: "#FFFFFF" },
  ARG: { accent: "#6CB4EE", badgeBg: "#FFFFFF", badgeText: "#0F172A" },
  BEL: { accent: "#111827", badgeBg: "#FFD90C", badgeText: "#111827" },
  TUR: { accent: "#E30A17", badgeBg: "#FFFFFF", badgeText: "#E30A17" },
  BIH: { accent: "#002F6C", badgeBg: "#FCD116", badgeText: "#111827" },
  TUN: { accent: "#E70013", badgeBg: "#FFFFFF", badgeText: "#E70013" },
  PAN: { accent: "#005293", badgeBg: "#D21034", badgeText: "#FFFFFF" },
  NED: { accent: "#21468B", badgeBg: "#AE1C28", badgeText: "#FFFFFF" },
  URU: { accent: "#6CCFF6", badgeBg: "#FFD100", badgeText: "#111827" },
  CAN: { accent: "#D80621", badgeBg: "#FFFFFF", badgeText: "#D80621" },
  SCO: { accent: "#0065BD", badgeBg: "#FFFFFF", badgeText: "#0065BD" },
  AUS: { accent: "#012169", badgeBg: "#E4002B", badgeText: "#FFFFFF" },
  IRQ: { accent: "#CE1126", badgeBg: "#239F40", badgeText: "#FFFFFF" },
  POR: { accent: "#006600", badgeBg: "#FF0000", badgeText: "#FFFFFF" },
  MEX: { accent: "#006847", badgeBg: "#CE1126", badgeText: "#FFFFFF" },
  AUT: { accent: "#ED2939", badgeBg: "#FFFFFF", badgeText: "#ED2939" },
  EGY: { accent: "#CE1126", badgeBg: "#C09300", badgeText: "#FFFFFF" },
  CUW: { accent: "#002B7F", badgeBg: "#F9E814", badgeText: "#111827" },
  CPV: { accent: "#003893", badgeBg: "#CF2027", badgeText: "#FFFFFF" },
  CIV: { accent: "#F77F00", badgeBg: "#009E60", badgeText: "#FFFFFF" },
};

const buildTheme = (seed) => ({
  accent: seed.accent,
  accentSoft: hexToRgba(seed.accent, 0.18),
  text: "#FFFFFF",
  subtext: "#D1D5DB",
  border: "rgba(255,255,255,0.14)",
  badgeBg: seed.badgeBg,
  badgeText: seed.badgeText,
});

const teamThemes = Object.fromEntries(Object.entries(teamThemeSeeds).map(([code, seed]) => [code, buildTheme(seed)]));

const teamCatalog = {
   FRA: { name: "France", group: "Group I", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 22, 5:00 PM ET vs Iraq" },
  JPN: { name: "Japan", group: "Group F", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 20 vs Tunisia" },
  SWE: { name: "Sweden", group: "Group F", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 20 vs Netherlands" },
  ALG: { name: "Algeria", group: "Group J", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 22, 11:00 PM ET vs Jordan" },
  QAT: { name: "Qatar", group: "Group B", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 18 vs Canada" },
  JOR: { name: "Jordan", group: "Group J", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 22, 11:00 PM ET vs Algeria" },
  ENG: { name: "England", group: "Group L", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 17, 4:00 PM ET vs Croatia" },
  NOR: { name: "Norway", group: "Group I", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 22, 8:00 PM ET vs Senegal" },
  SEN: { name: "Senegal", group: "Group I", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 22, 8:00 PM ET vs Norway" },
  HAI: { name: "Haiti", group: "Group C", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 19 vs Brazil" },
  NZL: { name: "New Zealand", group: "Group G", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 22 vs Egypt" },
  GER: { name: "Germany", group: "Group E", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 20 vs Côte d'Ivoire" },
  USA: { name: "United States", group: "Group D", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 19 vs Australia" },
  SUI: { name: "Switzerland", group: "Group B", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 18 vs Bosnia and Herzegovina" },
  CZE: { name: "Czechia", group: "Group A", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 18 vs South Africa" },
  KOR: { name: "South Korea", group: "Group A", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 18 vs Mexico" },
  KSA: { name: "Saudi Arabia", group: "Group H", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 21 vs Spain" },
  ESP: { name: "Spain", group: "Group H", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 21 vs Saudi Arabia" },
  COL: { name: "Colombia", group: "Group K", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 18, 2:00 AM ET vs Uzbekistan" },
  CRO: { name: "Croatia", group: "Group L", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 17, 4:00 PM ET vs England" },
  GHA: { name: "Ghana", group: "Group L", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 17, 7:00 PM ET vs Panama" },
  IRN: { name: "Iran", group: "Group G", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 21 vs Belgium" },
  COD: { name: "DR Congo", group: "Group K", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 17, 1:00 PM ET vs Portugal" },
  BRA: { name: "Brazil", group: "Group C", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 19 vs Haiti" },
  MAR: { name: "Morocco", group: "Group C", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 19 vs Scotland" },
  ECU: { name: "Ecuador", group: "Group E", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 20 vs Curaçao" },
  PAR: { name: "Paraguay", group: "Group D", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 19 vs Türkiye" },
  RSA: { name: "South Africa", group: "Group A", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 18 vs Czechia" },
  UZB: { name: "Uzbekistan", group: "Group K", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 18, 2:00 AM ET vs Colombia" },
  ARG: { name: "Argentina", group: "Group J", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 22, 1:00 PM ET vs Austria" },
  BEL: { name: "Belgium", group: "Group G", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 21 vs Iran" },
  TUR: { name: "Türkiye", group: "Group D", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 19 vs Paraguay" },
  BIH: { name: "Bosnia and Herzegovina", group: "Group B", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 18 vs Switzerland" },
  TUN: { name: "Tunisia", group: "Group F", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 20 vs Japan" },
  PAN: { name: "Panama", group: "Group L", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 17, 7:00 PM ET vs Ghana" },
  NED: { name: "Netherlands", group: "Group F", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 20 vs Sweden" },
  URU: { name: "Uruguay", group: "Group H", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 21 vs Cape Verde" },
  CAN: { name: "Canada", group: "Group B", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 18 vs Qatar" },
  SCO: { name: "Scotland", group: "Group C", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 19 vs Morocco" },
  AUS: { name: "Australia", group: "Group D", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 19 vs United States" },
  IRQ: { name: "Iraq", group: "Group I", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 22, 5:00 PM ET vs France" },
  POR: { name: "Portugal", group: "Group K", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 17, 1:00 PM ET vs DR Congo" },
  MEX: { name: "Mexico", group: "Group A", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 18 vs South Korea" },
  AUT: { name: "Austria", group: "Group J", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 22, 1:00 PM ET vs Argentina" },
  EGY: { name: "Egypt", group: "Group G", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 22 vs New Zealand" },
  CUW: { name: "Curaçao", group: "Group E", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 20 vs Ecuador" },
  CPV: { name: "Cape Verde", group: "Group H", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 21 vs Uruguay" },
  CIV: { name: "Côte d'Ivoire", group: "Group E", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 20 vs Germany" }
};

const owners = [
  { name: "David Hickey", codes: ["FRA", "JPN", "SWE", "ALG", "QAT", "JOR"] },
  { name: "Vince Barbati", codes: ["ENG", "NOR", "SEN", "CIV", "HAI", "NZL"] },
  { name: "Brandon", codes: ["GER", "USA", "SUI", "CZE", "KOR", "KSA"] },
  { name: "Matt Babecki", codes: ["ESP", "COL", "CRO", "GHA", "IRN", "COD"] },
  { name: "Mike Barbati", codes: ["BRA", "MAR", "ECU", "PAR", "RSA", "UZB"] },
  { name: "Eric Drake", codes: ["ARG", "BEL", "TUR", "BIH", "TUN", "PAN"] },
  { name: "Brian Scott", codes: ["NED", "URU", "CAN", "SCO", "AUS", "IRQ"] },
  { name: "Justyn Bensett", codes: ["POR", "MEX", "AUT", "EGY", "CUW", "CPV"] },
];

const initialMatches = [
  { date: "Jun 11", time: "3:00 PM ET", teamCode: "MEX", team: "Mexico", opponent: "South Africa", result: "2-0", status: "Win", pts: 3 },
  { date: "Jun 11", time: "3:00 PM ET", teamCode: "RSA", team: "South Africa", opponent: "Mexico", result: "0-2", status: "Loss", pts: 0 },
  { date: "Jun 11", time: "10:00 PM ET", teamCode: "KOR", team: "South Korea", opponent: "Czechia", result: "2-1", status: "Win", pts: 3 },
  { date: "Jun 11", time: "10:00 PM ET", teamCode: "CZE", team: "Czechia", opponent: "South Korea", result: "1-2", status: "Loss", pts: 0 },
  { date: "Jun 12", time: "3:00 PM ET", teamCode: "CAN", team: "Canada", opponent: "Bosnia and Herzegovina", result: "1-1", status: "Draw", pts: 1 },
  { date: "Jun 12", time: "3:00 PM ET", teamCode: "BIH", team: "Bosnia and Herzegovina", opponent: "Canada", result: "1-1", status: "Draw", pts: 1 },
  { date: "Jun 12", time: "9:00 PM ET", teamCode: "USA", team: "United States", opponent: "Paraguay", result: "4-1", status: "Win", pts: 3 },
  { date: "Jun 12", time: "9:00 PM ET", teamCode: "PAR", team: "Paraguay", opponent: "United States", result: "1-4", status: "Loss", pts: 0 },
  { date: "Jun 13", time: "3:00 PM ET", teamCode: "QAT", team: "Qatar", opponent: "Switzerland", result: "1-1", status: "Draw", pts: 1 },
  { date: "Jun 13", time: "3:00 PM ET", teamCode: "SUI", team: "Switzerland", opponent: "Qatar", result: "1-1", status: "Draw", pts: 1 },
  { date: "Jun 13", time: "6:00 PM ET", teamCode: "BRA", team: "Brazil", opponent: "Morocco", result: "1-1", status: "Draw", pts: 1 },
  { date: "Jun 13", time: "6:00 PM ET", teamCode: "MAR", team: "Morocco", opponent: "Brazil", result: "1-1", status: "Draw", pts: 1 },
  { date: "Jun 13", time: "9:00 PM ET", teamCode: "HAI", team: "Haiti", opponent: "Scotland", result: "0-1", status: "Loss", pts: 0 },
  { date: "Jun 13", time: "9:00 PM ET", teamCode: "SCO", team: "Scotland", opponent: "Haiti", result: "1-0", status: "Win", pts: 3 },
  { date: "Jun 14", time: "12:00 AM ET", teamCode: "AUS", team: "Australia", opponent: "Türkiye", result: "2-0", status: "Win", pts: 3 },
  { date: "Jun 14", time: "12:00 AM ET", teamCode: "TUR", team: "Türkiye", opponent: "Australia", result: "0-2", status: "Loss", pts: 0 },
  { date: "Jun 14", time: "1:00 PM ET", teamCode: "GER", team: "Germany", opponent: "Curaçao", result: "7-1", status: "Win", pts: 3 },
  { date: "Jun 14", time: "1:00 PM ET", teamCode: "CUW", team: "Curaçao", opponent: "Germany", result: "1-7", status: "Loss", pts: 0 },
  { date: "Jun 14", time: "4:00 PM ET", teamCode: "NED", team: "Netherlands", opponent: "Japan", result: "2-2", status: "Draw", pts: 1 },
  { date: "Jun 14", time: "4:00 PM ET", teamCode: "JPN", team: "Japan", opponent: "Netherlands", result: "2-2", status: "Draw", pts: 1 },
  { date: "Jun 14", time: "7:00 PM ET", teamCode: "ECU", team: "Ecuador", opponent: "Côte d'Ivoire", result: "0-1", status: "Loss", pts: 0 },
  { date: "Jun 14", time: "7:00 PM ET", teamCode: "CIV", team: "Côte d'Ivoire", opponent: "Ecuador", result: "1-0", status: "Win", pts: 3 },
  { date: "Jun 15", time: "12:00 PM ET", teamCode: "ESP", team: "Spain", opponent: "Cape Verde", result: "0-0", status: "Draw", pts: 1 },
  { date: "Jun 15", time: "12:00 PM ET", teamCode: "CPV", team: "Cape Verde", opponent: "Spain", result: "0-0", status: "Draw", pts: 1 },
  { date: "Jun 15", time: "3:00 PM ET", teamCode: "BEL", team: "Belgium", opponent: "Egypt", result: "1-1", status: "Draw", pts: 1 },
  { date: "Jun 15", time: "3:00 PM ET", teamCode: "EGY", team: "Egypt", opponent: "Belgium", result: "1-1", status: "Draw", pts: 1 },
  { date: "Jun 15", time: "6:00 PM ET", teamCode: "KSA", team: "Saudi Arabia", opponent: "Uruguay", result: "1-1", status: "Draw", pts: 1 },
  { date: "Jun 15", time: "6:00 PM ET", teamCode: "URU", team: "Uruguay", opponent: "Saudi Arabia", result: "1-1", status: "Draw", pts: 1 },
  { date: "Jun 15", time: "10:00 PM ET", teamCode: "SWE", team: "Sweden", opponent: "Tunisia", result: "5-1", status: "Win", pts: 3 },
  { date: "Jun 15", time: "10:00 PM ET", teamCode: "TUN", team: "Tunisia", opponent: "Sweden", result: "1-5", status: "Loss", pts: 0 },
  { date: "Jun 16", time: "12:00 AM ET", teamCode: "IRN", team: "Iran", opponent: "New Zealand", result: "2-2", status: "Draw", pts: 1 },
  { date: "Jun 16", time: "12:00 AM ET", teamCode: "NZL", team: "New Zealand", opponent: "Iran", result: "2-2", status: "Draw", pts: 1 },
  { date: "Jun 16", time: "3:00 PM ET", teamCode: "FRA", team: "France", opponent: "Senegal", result: "3-1", status: "Win", pts: 3 },
  { date: "Jun 16", time: "3:00 PM ET", teamCode: "SEN", team: "Senegal", opponent: "France", result: "1-3", status: "Loss", pts: 0 },
  { date: "Jun 16", time: "6:00 PM ET", teamCode: "IRQ", team: "Iraq", opponent: "Norway", result: "1-4", status: "Loss", pts: 0 },
  { date: "Jun 16", time: "6:00 PM ET", teamCode: "NOR", team: "Norway", opponent: "Iraq", result: "4-1", status: "Win", pts: 3 },
  { date: "Jun 16", time: "9:00 PM ET", teamCode: "ARG", team: "Argentina", opponent: "Algeria", result: "3-0", status: "Win", pts: 3 },
  { date: "Jun 16", time: "9:00 PM ET", teamCode: "ALG", team: "Algeria", opponent: "Argentina", result: "0-3", status: "Loss", pts: 0 },
  { date: "Jun 17", time: "12:00 AM ET", teamCode: "AUT", team: "Austria", opponent: "Jordan", result: "3-1", status: "Win", pts: 3 },
  { date: "Jun 17", time: "12:00 AM ET", teamCode: "JOR", team: "Jordan", opponent: "Austria", result: "1-3", status: "Loss", pts: 0 },
  { date: "Jun 17", time: "1:00 PM ET", teamCode: "POR", team: "Portugal", opponent: "DR Congo", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "1:00 PM ET", teamCode: "COD", team: "DR Congo", opponent: "Portugal", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "4:00 PM ET", teamCode: "ENG", team: "England", opponent: "Croatia", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "4:00 PM ET", teamCode: "CRO", team: "Croatia", opponent: "England", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "7:00 PM ET", teamCode: "GHA", team: "Ghana", opponent: "Panama", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "7:00 PM ET", teamCode: "PAN", team: "Panama", opponent: "Ghana", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 18", time: "2:00 AM ET", teamCode: "UZB", team: "Uzbekistan", opponent: "Colombia", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 18", time: "2:00 AM ET", teamCode: "COL", team: "Colombia", opponent: "Uzbekistan", result: "—", status: "Upcoming", pts: 0 }
];

const OWNER_ROSTERS = owners.map((owner) => {
  const teams = owner.codes.map((code) => ({ code, ...teamCatalog[code] }));
  return {
    ...owner,
    teams,
    totalPoints: teams.reduce((sum, team) => sum + team.points, 0),
    wins: teams.reduce((sum, team) => sum + team.record.w, 0),
    draws: teams.reduce((sum, team) => sum + team.record.d, 0),
    losses: teams.reduce((sum, team) => sum + team.record.l, 0),
  };
});

const LEADERBOARD = [...OWNER_ROSTERS].sort((a, b) => b.totalPoints - a.totalPoints || b.wins - a.wins || a.name.localeCompare(b.name));
const DIGEST_ITEMS = LEADERBOARD.slice(0, 5).map((owner, index) => `${index === 0 ? "Leads" : `#${index + 1}`}: ${owner.name} — ${owner.totalPoints} pts`);
const neutralStatusClass = "neutral-badge";

const triVertical = (a, b, c) => <div className="flag flag-tri-vertical"><div style={{ background: a }} /><div style={{ background: b }} /><div style={{ background: c }} /></div>;
const triHorizontal = (a, b, c, ratios = [1, 1, 1]) => {
  const total = ratios[0] + ratios[1] + ratios[2];
  return <div className="flag flag-tri-horizontal"><div style={{ height: `${(ratios[0] / total) * 100}%`, background: a }} /><div style={{ height: `${(ratios[1] / total) * 100}%`, background: b }} /><div style={{ height: `${(ratios[2] / total) * 100}%`, background: c }} /></div>;
};

const FlagIcon = memo(function FlagIcon({ code, className = "flag-icon" }) {
  const frame = (label, content) => <div className={className} aria-label={`${label} flag`} title={label}>{content}</div>;
  switch (code) {
    case "FRA": return frame("France", triVertical("#0055A4", "#FFFFFF", "#EF4135"));
    case "JPN": return frame("Japan", <div className="flag japan"><div className="sun" /></div>);
    case "SWE": return frame("Sweden", <div className="flag sweden"><div className="cross-v" /><div className="cross-h" /></div>);
    case "ALG": return frame("Algeria", <div className="flag algeria"><div className="left" /><div className="right" /><div className="center-symbol">☪</div></div>);
    case "QAT": return frame("Qatar", <div className="flag qatar"><div className="white-block" /><div className="teeth" /></div>);
    case "JOR": return frame("Jordan", <div className="flag jordan"><div className="stripes"><div className="s1" /><div className="s2" /><div className="s3" /></div><div className="triangle" /><div className="star">★</div></div>);
    case "ENG": return frame("England", <div className="flag england"><div className="cross-v" /><div className="cross-h" /></div>);
    case "SCO": return frame("Scotland", <div className="flag scotland"><div className="saltire one" /><div className="saltire two" /></div>);
    case "NOR": return frame("Norway", <div className="flag norway"><div className="cross-v white" /><div className="cross-h white" /><div className="cross-v blue" /><div className="cross-h blue" /></div>);
    case "SEN": return frame("Senegal", <div className="flag senegal">{triVertical("#00853F", "#FDEF42", "#E31B23")}<div className="center-star green">★</div></div>);
    case "HAI": return frame("Haiti", <div className="flag haiti"><div className="top" /><div className="bottom" /><div className="shield" /></div>);
    case "NZL": return frame("New Zealand", <div className="flag nz"><span className="star s1">✦</span><span className="star s2">✦</span><span className="star s3">✦</span></div>);
    case "GER": return frame("Germany", triHorizontal("#000000", "#DD0000", "#FFCE00"));
    case "USA": return frame("United States", <div className="flag usa"><div className="stripes">{Array.from({ length: 7 }).map((_, i) => <div key={i} className={i % 2 === 0 ? "red" : "white"} />)}</div><div className="canton" /></div>);
    case "SUI": return frame("Switzerland", <div className="flag swiss"><div className="cross-v" /><div className="cross-h" /></div>);
    case "CZE": return frame("Czechia", <div className="flag czechia"><div className="top" /><div className="bottom" /><div className="triangle" /></div>);
    case "KOR": return frame("South Korea", <div className="flag korea"><div className="taegeuk red" /><div className="taegeuk blue" /></div>);
    case "KSA": return frame("Saudi Arabia", <div className="flag saudi"><div className="script" /></div>);
    case "ESP": return frame("Spain", triHorizontal("#AA151B", "#F1BF00", "#AA151B", [1, 2, 1]));
    case "COL": return frame("Colombia", triHorizontal("#FCD116", "#003893", "#CE1126", [2, 1, 1]));
    case "CRO": return frame("Croatia", <div className="flag croatia">{triHorizontal("#FF0000", "#FFFFFF", "#171796")}<div className="checkerboard"><span /><span /><span /><span /></div></div>);
    case "GHA": return frame("Ghana", <div className="flag ghana">{triHorizontal("#CE1126", "#FCD116", "#006B3F")}<div className="center-star black">★</div></div>);
    case "IRN": return frame("Iran", triHorizontal("#239F40", "#FFFFFF", "#DA0000"));
    case "COD": return frame("DR Congo", <div className="flag drcongo"><div className="band gold" /><div className="band red" /></div>);
    case "BRA": return frame("Brazil", <div className="flag brazil"><div className="diamond" /><div className="circle" /></div>);
    case "MAR": return frame("Morocco", <div className="flag morocco"><div className="center-star green">★</div></div>);
    case "ECU": return frame("Ecuador", triHorizontal("#FCD116", "#003893", "#CE1126", [2, 1, 1]));
    case "PAR": return frame("Paraguay", triVertical("#D52B1E", "#FFFFFF", "#0038A8"));
    case "RSA": return frame("South Africa", <div className="flag southafrica"><div className="bottom-blue" /><div className="black-triangle" /><div className="green-band" /><div className="gold-band" /><div className="white-band" /></div>);
    case "UZB": return frame("Uzbekistan", <div className="flag uzbekistan"><div className="u1" /><div className="r1" /><div className="u2" /><div className="r2" /><div className="u3" /></div>);
    case "ARG": return frame("Argentina", <div className="flag argentina">{triHorizontal("#74ACDF", "#FFFFFF", "#74ACDF")}<div className="sun-dot">●</div></div>);
    case "BEL": return frame("Belgium", triVertical("#000000", "#FFD90C", "#EF3340"));
    case "TUR": return frame("Türkiye", <div className="flag turkey"><div className="moon outer" /><div className="moon inner" /><div className="star white">★</div></div>);
    case "BIH": return frame("Bosnia and Herzegovina", <div className="flag bosnia"><div className="triangle" /><div className="dots">●●●●</div></div>);
    case "TUN": return frame("Tunisia", <div className="flag tunisia"><div className="disc">●</div></div>);
    case "PAN": return frame("Panama", <div className="flag panama"><div className="cell ws">★</div><div className="cell r" /><div className="cell b" /><div className="cell wr">★</div></div>);
    case "NED": return frame("Netherlands", triHorizontal("#AE1C28", "#FFFFFF", "#21468B"));
    case "URU": return frame("Uruguay", <div className="flag uruguay"><div className="stripes">{Array.from({ length: 9 }).map((_, i) => <div key={i} className={i % 2 === 0 ? "white" : "blue"} />)}</div><div className="canton" /><div className="sun">☀</div></div>);
    case "CAN": return frame("Canada", <div className="flag canada"><div className="bar" /><div className="center">✦</div><div className="bar" /></div>);
    case "AUS": return frame("Australia", <div className="flag australia"><span className="star s1">✦</span><span className="star s2">✦</span><span className="star s3">✦</span></div>);
    case "IRQ": return frame("Iraq", <div className="flag iraq">{triHorizontal("#CE1126", "#FFFFFF", "#000000")}<div className="green-script">●</div></div>);
    case "POR": return frame("Portugal", <div className="flag portugal"><div className="left" /><div className="right" /><div className="crest" /></div>);
    case "MEX": return frame("Mexico", triVertical("#006847", "#FFFFFF", "#CE1126"));
    case "AUT": return frame("Austria", triHorizontal("#ED2939", "#FFFFFF", "#ED2939"));
    case "EGY": return frame("Egypt", <div className="flag egypt">{triHorizontal("#CE1126", "#FFFFFF", "#000000")}<div className="gold-script">●</div></div>);
    case "CUW": return frame("Curaçao", <div className="flag curacao"><div className="yellow-band" /><div className="tri" /><div className="star s1">★</div><div className="star s2">★</div></div>);
    case "CPV": return frame("Cape Verde", <div className="flag capeverde"><div className="line l1" /><div className="line l2" /><div className="line l3" /><div className="dots">●●●</div></div>);
    case "CIV": return frame("Côte d'Ivoire", triVertical("#F77F00", "#FFFFFF", "#009E60"));
    default: return <div className={className}><div className="flag fallback" /></div>;
  }
});

const TeamCard = memo(function TeamCard({ team }) {
  const theme = teamThemes[team.code] ?? buildTheme({ accent: "#475569", badgeBg: "#CBD5E1", badgeText: "#111827" });
  return (
    <article className="team-card" style={{ background: `linear-gradient(180deg, ${theme.accentSoft} 0%, rgba(10,10,10,0.98) 45%, rgba(0,0,0,1) 100%)`, borderColor: theme.border }}>
      <div className="team-card-header">
        <div className="team-title-wrap">
          <FlagIcon code={team.code} />
          <h3 className="team-title" style={{ color: theme.text }}>{team.name}</h3>
        </div>
        <span className="group-badge" style={{ background: theme.badgeBg, color: theme.badgeText }}>{team.group}</span>
      </div>
      <div className="team-stats" style={{ borderColor: theme.border }}>
        <span className="stat-strong" style={{ color: theme.text }}>PTS {team.points}</span>
        <span className="stat">W <b style={{ color: theme.text }}>{team.record.w}</b></span>
        <span className="stat">D <b style={{ color: theme.text }}>{team.record.d}</b></span>
        <span className="stat">L <b style={{ color: theme.text }}>{team.record.l}</b></span>
      </div>
      <div className="next-match-box" style={{ borderColor: theme.border }}>
        <div className="next-label">Next match</div>
        <div className="next-value" style={{ color: theme.text }}>{team.nextMatch}</div>
      </div>
    </article>
  );
});

function LeaderCard({ owner, index }) {
  return (
    <article className="leader-card">
      <div className="leader-top">
        <div>
          <div className="muted">{index === 0 ? "Current leader" : `Rank #${index + 1}`}</div>
          <div className="leader-name">{owner.name}</div>
        </div>
        <div className="leader-total-box">
          <div className="muted small">Total</div>
          <div className="leader-total">{owner.totalPoints}</div>
        </div>
      </div>
      <div className="leader-meta">
        <span className="meta-pill">W {owner.wins}</span>
        <span className="meta-pill">D {owner.draws}</span>
        <span className="meta-pill">L {owner.losses}</span>
        <span className="meta-pill">Teams {owner.teams.length}</span>
      </div>
    </article>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("rosters");
  const leaderboard = LEADERBOARD;
  const matches = initialMatches;

  const filteredOwners = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return leaderboard;
    return leaderboard
      .map((owner) => ({
        ...owner,
        teams: owner.teams.filter(
          (team) => owner.name.toLowerCase().includes(q) || team.name.toLowerCase().includes(q) || team.group.toLowerCase().includes(q)
        ),
      }))
      .filter((owner) => owner.teams.length > 0 || owner.name.toLowerCase().includes(q));
  }, [search, leaderboard]);

  const upcomingMatches = useMemo(() => matches.filter((m) => m.status === "Upcoming"), [matches]);
  const todayKey = useMemo(() => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "America/New_York" }).format(new Date()), []);
  const todayGames = useMemo(() => {
    const map = new Map();
    for (const m of upcomingMatches) {
      if (m.date !== todayKey) continue;
      const ordered = [m.team, m.opponent].sort((a, b) => a.localeCompare(b));
      const key = `${m.date}|${m.time}|${ordered.join("|")}`;
      if (!map.has(key)) map.set(key, { date: m.date, time: m.time, matchup: `${m.team} vs ${m.opponent}` });
    }
    return Array.from(map.values()).sort((a, b) => a.time.localeCompare(b.time));
  }, [upcomingMatches, todayKey]);

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="hero-card">
          <div>
            <h1 className="page-title">Fantasy World Cup Tracker</h1>
            <p className="hero-copy">Track all fantasy league rosters using the same dark scoreboard layout, with each owner’s six teams, current points, and next matches.</p>
            <div className="hero-badges">
              <span className="hero-pill">👥 {owners.length} fantasy managers</span>
              <span className="hero-pill">🕘 Daily check-in: 9:00 AM ET</span>
              <span className="hero-pill">🔄 Current seeded results through early Jun 16</span>
              <span className="hero-pill">✉️ Ready for fantasy digest emails</span>
            </div>
          </div>
          <div className="search-wrap">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search an owner, team, or group..." className="search-input" />
          </div>
        </header>

        <section className="leader-grid">
          {leaderboard.map((owner, index) => <LeaderCard key={owner.name} owner={owner} index={index} />)}
        </section>

        <nav className="tabs-bar">
          {[
            ["rosters", "Fantasy Rosters"],
            ["fixtures", "Tracked Fixtures"],
            ["digest", "9AM Digest Preview"],
            ["rules", "Points Rules"],
          ].map(([value, label]) => (
            <button key={value} className={`tab-btn ${tab === value ? "active" : ""}`} onClick={() => setTab(value)}>
              {label}
            </button>
          ))}
        </nav>

        {tab === "rosters" && (
          <section className="tab-panel stack-gap">
            {filteredOwners.map((owner) => (
              <section key={owner.name} className="owner-section stack-gap-sm">
                <div className="owner-header">
                  <div>
                    <div className="muted">Fantasy manager</div>
                    <h2 className="owner-name">{owner.name}</h2>
                  </div>
                  <div className="owner-pills">
                    <span className="hero-pill">🏆 {owner.totalPoints} total pts</span>
                    <span className="hero-pill">W {owner.wins}</span>
                    <span className="hero-pill">D {owner.draws}</span>
                    <span className="hero-pill">L {owner.losses}</span>
                  </div>
                </div>
                <div className="team-grid">
                  {owner.teams.map((team) => <TeamCard key={`${owner.name}-${team.code}`} team={team} />)}
                </div>
              </section>
            ))}
          </section>
        )}

        {tab === "fixtures" && (
          <section className="panel-card">
            <div className="panel-title">Tracked Team Fixtures & Results</div>
            <div className="fixture-list">
              {matches.map((m, i) => (
                <div key={`${m.teamCode}-${i}`} className="fixture-row">
                  <div className="fixture-main">
                    <FlagIcon code={m.teamCode} />
                    <div>
                      <div className="muted">{m.date} • {m.time}</div>
                      <div className="fixture-title">{m.team} vs {m.opponent}</div>
                    </div>
                  </div>
                  <div className="fixture-side">
                    <div className="fixture-result">{m.result}</div>
                    <span className={neutralStatusClass}>{m.status}</span>
                    <div className="score-pill">+{m.pts} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "digest" && (
          <section className="digest-grid">
            <div className="panel-card">
              <div className="panel-title">Daily 9AM ET Fantasy Digest Preview</div>
              <div className="digest-box">
                <div className="subject-box">
                  <div className="subject-title">Subject</div>
                  <div className="subject-line">Fantasy World Cup tracker update — standings and schedules</div>
                </div>
                <div className="body-box">
                  <p>Good morning — here’s your latest fantasy league group-stage update.</p>
                  <ul>
                    {DIGEST_ITEMS.map((item) => <li key={item}>{item}</li>)}
                    <li>{upcomingMatches.length} tracked match entries are still upcoming.</li>
                  </ul>
                  <div className="today-games">
                    <div className="subject-title">Today’s games</div>
                    <ul>
                      {todayGames.length > 0 ? todayGames.map((game) => (
                        <li key={`${game.date}-${game.time}-${game.matchup}`}>{game.time} — {game.matchup}</li>
                      )) : <li>No tracked games scheduled for today.</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-title">Next Up</div>
              <div className="next-list">
                {upcomingMatches.slice(0, 8).map((m, i) => (
                  <div key={`${m.teamCode}-next-${i}`} className="next-row">
                    <FlagIcon code={m.teamCode} />
                    <div>
                      <div className="muted">{m.date} • {m.time}</div>
                      <div className="fixture-title">{m.team} vs {m.opponent}</div>
                    </div>
                  </div>
                ))}
                <button className="send-btn">Send test digest (sample)</button>
              </div>
            </div>
          </section>
        )}

        {tab === "rules" && (
          <section className="panel-card">
            <div className="panel-title">Group Stage Points</div>
            <div className="rules-grid">
              <div className="rule-card">
                <div className="rule-icon">🏆</div>
                <div className="rule-title">Win = 3</div>
                <div className="muted">Three points for a victory</div>
              </div>
              <div className="rule-card">
                <div className="rule-icon">=</div>
                <div className="rule-title">Draw = 1</div>
                <div className="muted">One point each team</div>
              </div>
              <div className="rule-card">
                <div className="rule-icon">0</div>
                <div className="rule-title">Loss = 0</div>
                <div className="muted">No points for a loss</div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
