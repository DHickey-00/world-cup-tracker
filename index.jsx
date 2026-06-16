import React, { memo, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Clock3, Trophy, RefreshCw, Users } from "lucide-react";

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
  FRA: { name: "France", group: "Group I", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 16, 3:00 PM ET vs Senegal" },
  JPN: { name: "Japan", group: "Group F", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 20 vs Tunisia" },
  SWE: { name: "Sweden", group: "Group F", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 20 vs Netherlands" },
  ALG: { name: "Algeria", group: "Group J", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 16, 9:00 PM ET vs Argentina" },
  QAT: { name: "Qatar", group: "Group B", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 18 vs Canada" },
  JOR: { name: "Jordan", group: "Group J", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 17, 12:00 AM ET vs Austria" },
  ENG: { name: "England", group: "Group L", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 17, 4:00 PM ET vs Croatia" },
  NOR: { name: "Norway", group: "Group I", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 16, 6:00 PM ET vs Iraq" },
  SEN: { name: "Senegal", group: "Group I", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 16, 3:00 PM ET vs France" },
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
  ARG: { name: "Argentina", group: "Group J", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 16, 9:00 PM ET vs Algeria" },
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
  IRQ: { name: "Iraq", group: "Group I", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 16, 6:00 PM ET vs Norway" },
  POR: { name: "Portugal", group: "Group K", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 17, 1:00 PM ET vs DR Congo" },
  MEX: { name: "Mexico", group: "Group A", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 18 vs South Korea" },
  AUT: { name: "Austria", group: "Group J", points: 0, record: { w: 0, d: 0, l: 0 }, nextMatch: "Jun 17, 12:00 AM ET vs Jordan" },
  EGY: { name: "Egypt", group: "Group G", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 22 vs New Zealand" },
  CUW: { name: "Curaçao", group: "Group E", points: 0, record: { w: 0, d: 0, l: 1 }, nextMatch: "Jun 20 vs Ecuador" },
  CPV: { name: "Cape Verde", group: "Group H", points: 1, record: { w: 0, d: 1, l: 0 }, nextMatch: "Jun 21 vs Uruguay" },
  CIV: { name: "Côte d'Ivoire", group: "Group E", points: 3, record: { w: 1, d: 0, l: 0 }, nextMatch: "Jun 20 vs Germany" },
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
  { date: "Jun 16", time: "3:00 PM ET", teamCode: "FRA", team: "France", opponent: "Senegal", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 16", time: "3:00 PM ET", teamCode: "SEN", team: "Senegal", opponent: "France", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 16", time: "6:00 PM ET", teamCode: "IRQ", team: "Iraq", opponent: "Norway", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 16", time: "6:00 PM ET", teamCode: "NOR", team: "Norway", opponent: "Iraq", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 16", time: "9:00 PM ET", teamCode: "ARG", team: "Argentina", opponent: "Algeria", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 16", time: "9:00 PM ET", teamCode: "ALG", team: "Algeria", opponent: "Argentina", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "12:00 AM ET", teamCode: "AUT", team: "Austria", opponent: "Jordan", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "12:00 AM ET", teamCode: "JOR", team: "Jordan", opponent: "Austria", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "1:00 PM ET", teamCode: "POR", team: "Portugal", opponent: "DR Congo", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "1:00 PM ET", teamCode: "COD", team: "DR Congo", opponent: "Portugal", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "4:00 PM ET", teamCode: "ENG", team: "England", opponent: "Croatia", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "4:00 PM ET", teamCode: "CRO", team: "Croatia", opponent: "England", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "7:00 PM ET", teamCode: "GHA", team: "Ghana", opponent: "Panama", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 17", time: "7:00 PM ET", teamCode: "PAN", team: "Panama", opponent: "Ghana", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 18", time: "2:00 AM ET", teamCode: "UZB", team: "Uzbekistan", opponent: "Colombia", result: "—", status: "Upcoming", pts: 0 },
  { date: "Jun 18", time: "2:00 AM ET", teamCode: "COL", team: "Colombia", opponent: "Uzbekistan", result: "—", status: "Upcoming", pts: 0 },
];

const neutralStatusClass = "border border-white/10 bg-white/5 text-slate-200";

const triVertical = (a, b, c) => <div className="flex h-full w-full"><div className="w-1/3 bg-[color:var(--a)]" style={{ ["--a"]: a }} /><div className="w-1/3 bg-[color:var(--b)]" style={{ ["--b"]: b }} /><div className="w-1/3 bg-[color:var(--c)]" style={{ ["--c"]: c }} /></div>;
const triHorizontal = (a, b, c, ratios = [1, 1, 1]) => {
  const total = ratios[0] + ratios[1] + ratios[2];
  return <div className="flex h-full w-full flex-col"><div style={{ height: `${(ratios[0] / total) * 100}%`, background: a }} /><div style={{ height: `${(ratios[1] / total) * 100}%`, background: b }} /><div style={{ height: `${(ratios[2] / total) * 100}%`, background: c }} /></div>;
};

const FlagIcon = memo(function FlagIcon({ code, className = "h-5 w-7" }) {
  const commonClass = `${className} shrink-0 overflow-hidden rounded-[4px] border border-white/15 bg-white shadow-sm`;
  const frame = (label, content) => <div className={commonClass} aria-label={`${label} flag`} title={label}>{content}</div>;

  switch (code) {
    case "FRA": return frame("France", triVertical("#0055A4", "#FFFFFF", "#EF4135"));
    case "JPN": return frame("Japan", <div className="flex h-full w-full items-center justify-center bg-white"><div className="h-3 w-3 rounded-full bg-[#BC002D]" /></div>);
    case "SWE": return frame("Sweden", <div className="relative h-full w-full bg-[#006AA7]"><div className="absolute left-[28%] top-0 h-full w-[18%] bg-[#FECC00]" /><div className="absolute left-0 top-[42%] h-[18%] w-full bg-[#FECC00]" /></div>);
    case "ALG": return frame("Algeria", <div className="relative h-full w-full"><div className="absolute inset-y-0 left-0 w-1/2 bg-[#006233]" /><div className="absolute inset-y-0 right-0 w-1/2 bg-white" /><div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#D21034]">☪</div></div>);
    case "QAT": return frame("Qatar", <div className="relative h-full w-full bg-[#8A1538]"><div className="absolute inset-y-0 left-0 w-[38%] bg-white" /><div className="absolute inset-y-0 left-[34%] w-[18%] bg-[linear-gradient(to_bottom,transparent_0%,transparent_8%,#8A1538_8%,#8A1538_16%,transparent_16%,transparent_24%,#8A1538_24%,#8A1538_32%,transparent_32%,transparent_40%,#8A1538_40%,#8A1538_48%,transparent_48%,transparent_56%,#8A1538_56%,#8A1538_64%,transparent_64%,transparent_72%,#8A1538_72%,#8A1538_80%,transparent_80%,transparent_88%,#8A1538_88%,#8A1538_96%,transparent_96%,transparent_100%)]" /></div>);
    case "JOR": return frame("Jordan", <div className="relative h-full w-full"><div className="absolute inset-0 flex flex-col"><div className="h-1/3 bg-black" /><div className="h-1/3 bg-white" /><div className="h-1/3 bg-[#007A3D]" /></div><div className="absolute left-0 top-0 h-full w-[42%] bg-[#CE1126] [clip-path:polygon(0_0,100%_50%,0_100%)]" /><div className="absolute left-[10%] top-1/2 -translate-y-1/2 text-[8px] text-white">★</div></div>);
    case "ENG": return frame("England", <div className="relative h-full w-full bg-white"><div className="absolute left-[42%] top-0 h-full w-[16%] bg-[#CE1126]" /><div className="absolute left-0 top-[42%] h-[16%] w-full bg-[#CE1126]" /></div>);
    case "SCO": return frame("Scotland", <div className="relative h-full w-full bg-[#0065BD]"><div className="absolute left-[-18%] top-[40%] h-[18%] w-[140%] rotate-[35deg] bg-white" /><div className="absolute left-[-18%] top-[40%] h-[18%] w-[140%] -rotate-[35deg] bg-white" /></div>);
    case "NOR": return frame("Norway", <div className="relative h-full w-full bg-[#BA0C2F]"><div className="absolute left-[26%] top-0 h-full w-[20%] bg-white" /><div className="absolute left-0 top-[38%] h-[24%] w-full bg-white" /><div className="absolute left-[31%] top-0 h-full w-[10%] bg-[#00205B]" /><div className="absolute left-0 top-[43%] h-[14%] w-full bg-[#00205B]" /></div>);
    case "SEN": return frame("Senegal", <div className="relative h-full w-full">{triVertical("#00853F", "#FDEF42", "#E31B23")}<div className="absolute inset-0 flex items-center justify-center text-[8px] text-[#00853F]">★</div></div>);
    case "HAI": return frame("Haiti", <div className="relative h-full w-full"><div className="h-1/2 bg-[#00209F]" /><div className="h-1/2 bg-[#D21034]" /><div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-white" /></div>);
    case "NZL": return frame("New Zealand", <div className="relative h-full w-full bg-[#00247D]"><div className="absolute right-[18%] top-[18%] text-[7px] text-red-400">✦</div><div className="absolute right-[35%] top-[44%] text-[7px] text-red-400">✦</div><div className="absolute right-[12%] top-[62%] text-[7px] text-red-400">✦</div></div>);
    case "GER": return frame("Germany", triHorizontal("#000000", "#DD0000", "#FFCE00"));
    case "USA": return frame("United States", <div className="relative h-full w-full bg-white"><div className="absolute inset-0 flex flex-col">{Array.from({ length: 7 }).map((_, i) => <div key={i} className={`h-[14.285%] ${i % 2 === 0 ? "bg-[#B22234]" : "bg-white"}`} />)}</div><div className="absolute left-0 top-0 h-[54%] w-[42%] bg-[#3C3B6E]" /></div>);
    case "SUI": return frame("Switzerland", <div className="relative h-full w-full bg-[#D52B1E]"><div className="absolute left-[36%] top-[18%] h-[64%] w-[28%] bg-white" /><div className="absolute left-[18%] top-[36%] h-[28%] w-[64%] bg-white" /></div>);
    case "CZE": return frame("Czechia", <div className="relative h-full w-full"><div className="h-1/2 bg-white" /><div className="h-1/2 bg-[#D7141A]" /><div className="absolute left-0 top-0 h-full w-[45%] bg-[#11457E] [clip-path:polygon(0_0,100%_50%,0_100%)]" /></div>);
    case "KOR": return frame("South Korea", <div className="relative flex h-full w-full items-center justify-center bg-white"><div className="h-3 w-3 rounded-full bg-[#C60C30]" /><div className="absolute h-3 w-3 translate-x-[2px] rounded-full bg-[#003478] [clip-path:inset(50%_0_0_0)]" /></div>);
    case "KSA": return frame("Saudi Arabia", <div className="relative h-full w-full bg-[#006C35]"><div className="absolute left-[20%] top-[42%] h-[10%] w-[60%] bg-white" /></div>);
    case "ESP": return frame("Spain", triHorizontal("#AA151B", "#F1BF00", "#AA151B", [1, 2, 1]));
    case "COL": return frame("Colombia", triHorizontal("#FCD116", "#003893", "#CE1126", [2, 1, 1]));
    case "CRO": return frame("Croatia", <div className="relative h-full w-full">{triHorizontal("#FF0000", "#FFFFFF", "#171796")}<div className="absolute left-1/2 top-1/2 grid h-3 w-3 -translate-x-1/2 -translate-y-1/2 grid-cols-2 overflow-hidden border border-black/10 bg-white"><div className="bg-[#FF0000]" /><div className="bg-white" /><div className="bg-white" /><div className="bg-[#FF0000]" /></div></div>);
    case "GHA": return frame("Ghana", <div className="relative h-full w-full">{triHorizontal("#CE1126", "#FCD116", "#006B3F")}<div className="absolute inset-0 flex items-center justify-center text-[8px] text-black">★</div></div>);
    case "IRN": return frame("Iran", triHorizontal("#239F40", "#FFFFFF", "#DA0000"));
    case "COD": return frame("DR Congo", <div className="relative h-full w-full bg-[#00A3E0]"><div className="absolute left-[-10%] top-[44%] h-[14%] w-[120%] rotate-[-28deg] bg-[#F7D618]" /><div className="absolute left-[-10%] top-[47%] h-[8%] w-[120%] rotate-[-28deg] bg-[#EF3340]" /></div>);
    case "BRA": return frame("Brazil", <div className="relative h-full w-full bg-[#009C3B]"><div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#FFDF00]" /><div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#002776]" /></div>);
    case "MAR": return frame("Morocco", <div className="relative h-full w-full bg-[#C1272D]"><div className="absolute inset-0 flex items-center justify-center text-[8px] text-[#006233]">★</div></div>);
    case "ECU": return frame("Ecuador", triHorizontal("#FCD116", "#003893", "#CE1126", [2, 1, 1]));
    case "PAR": return frame("Paraguay", triVertical("#D52B1E", "#FFFFFF", "#0038A8"));
    case "RSA": return frame("South Africa", <div className="relative h-full w-full bg-[#DE3831]"><div className="absolute bottom-0 right-0 h-1/2 w-full bg-[#002395]" /><div className="absolute left-0 top-0 h-full w-[40%] bg-black [clip-path:polygon(0_0,100%_30%,100%_70%,0_100%)]" /><div className="absolute left-[18%] top-0 h-full w-[90%] bg-[#007A4D] [clip-path:polygon(0_38%,100%_20%,100%_34%,25%_50%,100%_66%,100%_80%,0_62%,14%_50%)]" /><div className="absolute left-[11%] top-0 h-full w-[96%] bg-[#FFB612] [clip-path:polygon(0_34%,100%_16%,100%_24%,18%_50%,100%_76%,100%_84%,0_66%,10%_50%)] opacity-90" /><div className="absolute left-[16%] top-[6%] h-[88%] w-[88%] bg-white [clip-path:polygon(0_34%,100%_20%,100%_28%,22%_50%,100%_72%,100%_80%,0_66%,13%_50%)]" /></div>);
    case "UZB": return frame("Uzbekistan", <div className="flex h-full w-full flex-col"><div className="h-[34%] bg-[#00A3DD]" /><div className="h-[6%] bg-[#CE1126]" /><div className="h-[26%] bg-white" /><div className="h-[6%] bg-[#CE1126]" /><div className="h-[28%] bg-[#1EB53A]" /></div>);
    case "ARG": return frame("Argentina", <div className="relative h-full w-full">{triHorizontal("#74ACDF", "#FFFFFF", "#74ACDF")}<div className="absolute inset-0 flex items-center justify-center text-[7px] text-[#F6B40E]">●</div></div>);
    case "BEL": return frame("Belgium", triVertical("#000000", "#FFD90C", "#EF3340"));
    case "TUR": return frame("Türkiye", <div className="relative h-full w-full bg-[#E30A17]"><div className="absolute left-[24%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white" /><div className="absolute left-[28%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#E30A17]" /><div className="absolute left-[44%] top-1/2 -translate-y-1/2 text-[7px] text-white">★</div></div>);
    case "BIH": return frame("Bosnia and Herzegovina", <div className="relative h-full w-full bg-[#002F6C]"><div className="absolute right-0 top-0 h-full w-[46%] bg-[#FCD116] [clip-path:polygon(100%_0,0_50%,100%_100%)]" /><div className="absolute right-[7%] top-[8%] flex h-full flex-col gap-[1px] text-[5px] text-white"><span>●</span><span>●</span><span>●</span><span>●</span></div></div>);
    case "TUN": return frame("Tunisia", <div className="relative flex h-full w-full items-center justify-center bg-[#E70013]"><div className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[7px] text-[#E70013]">●</div></div>);
    case "PAN": return frame("Panama", <div className="grid h-full w-full grid-cols-2 grid-rows-2"><div className="flex items-center justify-center bg-white text-[7px] text-[#005293]">★</div><div className="bg-[#D21034]" /><div className="bg-[#005293]" /><div className="flex items-center justify-center bg-white text-[7px] text-[#D21034]">★</div></div>);
    case "NED": return frame("Netherlands", triHorizontal("#AE1C28", "#FFFFFF", "#21468B"));
    case "URU": return frame("Uruguay", <div className="relative h-full w-full bg-white"><div className="absolute inset-0 flex flex-col">{Array.from({ length: 9 }).map((_, i) => <div key={i} className={`h-[11.111%] ${i % 2 === 0 ? "bg-white" : "bg-[#6CCFF6]"}`} />)}</div><div className="absolute left-0 top-0 h-[48%] w-[34%] bg-white" /><div className="absolute left-[9%] top-[9%] text-[8px] text-[#F6B40E]">☀</div></div>);
    case "CAN": return frame("Canada", <div className="flex h-full w-full"><div className="w-1/4 bg-[#D80621]" /><div className="flex w-1/2 items-center justify-center bg-white text-[8px] text-[#D80621]">✦</div><div className="w-1/4 bg-[#D80621]" /></div>);
    case "AUS": return frame("Australia", <div className="relative h-full w-full bg-[#012169]"><div className="absolute left-[16%] top-[20%] text-[7px] text-white">✦</div><div className="absolute right-[14%] top-[28%] text-[6px] text-white">✦</div><div className="absolute right-[26%] top-[58%] text-[8px] text-white">✦</div></div>);
    case "IRQ": return frame("Iraq", <div className="relative h-full w-full">{triHorizontal("#CE1126", "#FFFFFF", "#000000")}<div className="absolute inset-0 flex items-center justify-center text-[7px] text-[#239F40]">●</div></div>);
    case "POR": return frame("Portugal", <div className="relative flex h-full w-full"><div className="w-[40%] bg-[#006600]" /><div className="w-[60%] bg-[#FF0000]" /><div className="absolute left-[34%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-[#FFDF00] bg-[#FFCC00]" /></div>);
    case "MEX": return frame("Mexico", triVertical("#006847", "#FFFFFF", "#CE1126"));
    case "AUT": return frame("Austria", triHorizontal("#ED2939", "#FFFFFF", "#ED2939"));
    case "EGY": return frame("Egypt", <div className="relative h-full w-full">{triHorizontal("#CE1126", "#FFFFFF", "#000000")}<div className="absolute inset-0 flex items-center justify-center text-[7px] text-[#C09300]">●</div></div>);
    case "CUW": return frame("Curaçao", <div className="relative h-full w-full bg-[#002B7F]"><div className="absolute left-0 top-[58%] h-[12%] w-full bg-[#F9E814]" /><div className="absolute left-0 top-0 h-[46%] w-[34%] bg-[#002B7F] [clip-path:polygon(0_0,100%_0,0_100%)]" /><div className="absolute left-[7%] top-[12%] text-[6px] text-white">★</div><div className="absolute left-[15%] top-[22%] text-[4px] text-white">★</div></div>);
    case "CPV": return frame("Cape Verde", <div className="relative h-full w-full bg-[#003893]"><div className="absolute left-0 top-[54%] h-[8%] w-full bg-white" /><div className="absolute left-0 top-[64%] h-[6%] w-full bg-[#CF2027]" /><div className="absolute left-0 top-[72%] h-[8%] w-full bg-white" /><div className="absolute left-[18%] top-[42%] text-[6px] text-[#F7D116]">●●●</div></div>);
    case "CIV": return frame("Côte d'Ivoire", triVertical("#F77F00", "#FFFFFF", "#009E60"));
    default: return <div className={`${commonClass} bg-slate-700`} aria-hidden="true" />;
  }
});

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

const TeamCard = memo(function TeamCard({ team }) {
  const theme = teamThemes[team.code] ?? buildTheme({ accent: "#475569", badgeBg: "#CBD5E1", badgeText: "#111827" });
  return (
    <Card
      className="rounded-3xl border-0 shadow-sm"
      style={{
        background: `linear-gradient(180deg, ${theme.accentSoft} 0%, rgba(10,10,10,0.98) 45%, rgba(0,0,0,1) 100%)`,
        border: `1px solid ${theme.border}`,
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <FlagIcon code={team.code} />
            <CardTitle style={{ color: theme.text }} className="truncate text-xl">{team.name}</CardTitle>
          </div>
          <Badge className="shrink-0 hover:opacity-95" style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}>
            {team.group}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-2xl border px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: theme.border }}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-semibold" style={{ color: theme.text }}>PTS {team.points}</span>
            <span style={{ color: theme.subtext }}>W <span className="font-semibold" style={{ color: theme.text }}>{team.record.w}</span></span>
            <span style={{ color: theme.subtext }}>D <span className="font-semibold" style={{ color: theme.text }}>{team.record.d}</span></span>
            <span style={{ color: theme.subtext }}>L <span className="font-semibold" style={{ color: theme.text }}>{team.record.l}</span></span>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: "rgba(255,255,255,0.03)" }}>
          <div className="text-sm font-medium" style={{ color: theme.subtext }}>Next match</div>
          <div className="mt-1 text-base font-semibold" style={{ color: theme.text }}>{team.nextMatch}</div>
        </div>
      </CardContent>
    </Card>
  );
});

export default function WorldCupTeamTracker() {
  const [search, setSearch] = useState("");
  const leaderboard = LEADERBOARD;
  const matches = initialMatches;

  const filteredOwners = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return leaderboard;
    return leaderboard
      .map((owner) => ({
        ...owner,
        teams: owner.teams.filter(
          (team) =>
            owner.name.toLowerCase().includes(q) ||
            team.name.toLowerCase().includes(q) ||
            team.group.toLowerCase().includes(q)
        ),
      }))
      .filter((owner) => owner.teams.length > 0 || owner.name.toLowerCase().includes(q));
  }, [search, leaderboard]);

  const upcomingMatches = useMemo(() => matches.filter((m) => m.status === "Upcoming"), [matches]);

  const todayKey = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "America/New_York" }).format(new Date()),
    []
  );

  const todayGames = useMemo(() => {
    const map = new Map();
    for (const m of upcomingMatches) {
      if (m.date !== todayKey) continue;
      const ordered = [m.team, m.opponent].sort((a, b) => a.localeCompare(b));
      const key = `${m.date}|${m.time}|${ordered.join("|")}`;
      if (!map.has(key)) {
        map.set(key, { date: m.date, time: m.time, matchup: `${m.team} vs ${m.opponent}` });
      }
    }
    return Array.from(map.values()).sort((a, b) => a.time.localeCompare(b.time));
  }, [upcomingMatches, todayKey]);

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Fantasy World Cup Tracker</h1>
            <p className="mt-2 text-slate-300">Track all fantasy league rosters using the same dark scoreboard layout, with each owner’s six teams, current points, and next matches.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="border border-white/10 bg-white/5 text-slate-200 hover:bg-white/5"><Users className="mr-1 h-3.5 w-3.5" /> {owners.length} fantasy managers</Badge>
              <Badge className="border border-white/10 bg-white/5 text-slate-200 hover:bg-white/5"><Clock3 className="mr-1 h-3.5 w-3.5" /> Daily check-in: 9:00 AM ET</Badge>
              <Badge className="border border-white/10 bg-white/5 text-slate-200 hover:bg-white/5"><RefreshCw className="mr-1 h-3.5 w-3.5" /> Current seeded results through early Jun 16</Badge>
              <Badge className="border border-white/10 bg-white/5 text-slate-200 hover:bg-white/5"><Mail className="mr-1 h-3.5 w-3.5" /> Ready for fantasy digest emails</Badge>
            </div>
          </div>
          <div className="w-full md:max-w-sm">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search an owner, team, or group..." className="rounded-2xl border-white/10 bg-black text-white placeholder:text-slate-500" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {leaderboard.map((owner, index) => (
            <Card key={owner.name} className="rounded-3xl border border-white/10 bg-zinc-950 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-slate-400">{index === 0 ? "Current leader" : `Rank #${index + 1}`}</div>
                    <div className="mt-1 text-lg font-semibold text-white">{owner.name}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                    <div className="text-xs text-slate-400">Total</div>
                    <div className="text-2xl font-bold text-white">{owner.totalPoints}</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  <span className="rounded-full bg-white/5 px-2 py-1">W {owner.wins}</span>
                  <span className="rounded-full bg-white/5 px-2 py-1">D {owner.draws}</span>
                  <span className="rounded-full bg-white/5 px-2 py-1">L {owner.losses}</span>
                  <span className="rounded-full bg-white/5 px-2 py-1">Teams {owner.teams.length}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="rosters" className="space-y-4">
          <TabsList className="flex flex-wrap rounded-2xl border border-white/10 bg-zinc-950 shadow-sm">
            <TabsTrigger value="rosters" className="text-slate-200 data-[state=active]:bg-white/10 data-[state=active]:text-white">Fantasy Rosters</TabsTrigger>
            <TabsTrigger value="fixtures" className="text-slate-200 data-[state=active]:bg-white/10 data-[state=active]:text-white">Tracked Fixtures</TabsTrigger>
            <TabsTrigger value="digest" className="text-slate-200 data-[state=active]:bg-white/10 data-[state=active]:text-white">9AM Digest Preview</TabsTrigger>
            <TabsTrigger value="rules" className="text-slate-200 data-[state=active]:bg-white/10 data-[state=active]:text-white">Points Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="rosters" className="space-y-6">
            {filteredOwners.map((owner) => (
              <section key={owner.name} className="space-y-4">
                <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-zinc-950 p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-sm text-slate-400">Fantasy manager</div>
                    <h2 className="text-2xl font-bold text-white">{owner.name}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="border border-white/10 bg-white/5 text-slate-200 hover:bg-white/5"><Trophy className="mr-1 h-3.5 w-3.5" /> {owner.totalPoints} total pts</Badge>
                    <Badge className="border border-white/10 bg-white/5 text-slate-200 hover:bg-white/5">W {owner.wins}</Badge>
                    <Badge className="border border-white/10 bg-white/5 text-slate-200 hover:bg-white/5">D {owner.draws}</Badge>
                    <Badge className="border border-white/10 bg-white/5 text-slate-200 hover:bg-white/5">L {owner.losses}</Badge>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {owner.teams.map((team) => <TeamCard key={`${owner.name}-${team.code}`} team={team} />)}
                </div>
              </section>
            ))}
          </TabsContent>

          <TabsContent value="fixtures">
            <Card className="rounded-3xl border border-white/10 bg-zinc-950 shadow-sm">
              <CardHeader><CardTitle className="text-white">Tracked Team Fixtures & Results</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {matches.map((m, i) => (
                    <div key={`${m.teamCode}-${i}`} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <FlagIcon code={m.teamCode} />
                        <div>
                          <div className="text-sm text-slate-400">{m.date} • {m.time}</div>
                          <div className="text-base font-semibold text-white">{m.team} vs {m.opponent}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-slate-200">{m.result}</div>
                        <Badge className={neutralStatusClass}>{m.status}</Badge>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">+{m.pts} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="digest">
            <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
              <Card className="rounded-3xl border border-white/10 bg-zinc-950 shadow-sm">
                <CardHeader><CardTitle className="text-white">Daily 9AM ET Fantasy Digest Preview</CardTitle></CardHeader>
                <CardContent className="space-y-4 text-slate-200">
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <div className="font-semibold text-white">Subject</div>
                    <div className="mt-1 text-slate-300">Fantasy World Cup tracker update — standings and schedules</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4 leading-7">
                    <p className="text-slate-200">Good morning — here’s your latest fantasy league group-stage update.</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
                      {DIGEST_ITEMS.map((item) => <li key={item}>{item}</li>)}
                      <li>{upcomingMatches.length} tracked match entries are still upcoming.</li>
                    </ul>
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="text-sm font-semibold text-white">Today’s games</div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                        {todayGames.length > 0 ? todayGames.map((game) => (
                          <li key={`${game.date}-${game.time}-${game.matchup}`}>{game.time} — {game.matchup}</li>
                        )) : <li>No tracked games scheduled for today.</li>}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-white/10 bg-zinc-950 shadow-sm">
                <CardHeader><CardTitle className="text-white">Next Up</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {upcomingMatches.slice(0, 8).map((m, i) => (
                    <div key={`${m.teamCode}-next-${i}`} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      <div className="flex items-center gap-3">
                        <FlagIcon code={m.teamCode} />
                        <div>
                          <div className="text-sm text-slate-400">{m.date} • {m.time}</div>
                          <div className="mt-1 font-semibold text-white">{m.team} vs {m.opponent}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button className="mt-2 w-full rounded-2xl bg-white text-black hover:bg-slate-200">Send test digest (sample)</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rules">
            <Card className="rounded-3xl border border-white/10 bg-zinc-950 shadow-sm">
              <CardHeader><CardTitle className="text-white">Group Stage Points</CardTitle></CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-center">
                    <Trophy className="mx-auto mb-2 h-6 w-6 text-white" />
                    <div className="text-lg font-bold text-white">Win = 3</div>
                    <div className="text-sm text-slate-300">Three points for a victory</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-center">
                    <div className="mx-auto mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-black">=</div>
                    <div className="text-lg font-bold text-white">Draw = 1</div>
                    <div className="text-sm text-slate-300">One point each team</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-center">
                    <div className="mx-auto mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-black">0</div>
                    <div className="text-lg font-bold text-white">Loss = 0</div>
                    <div className="text-sm text-slate-300">No points for a loss</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
