import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  BookCheck,
  BookText,
  CalendarClock,
  ClipboardCheck,
  Home,
  LayoutDashboard,
  Palette,
  Users,
  Wallet,
} from "lucide-react";

export interface NavItem {
  id: number;
  title: string;
  icon?: React.ReactNode;
  href: string;
}

export const headerMenu: NavItem[] = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "Tattoo artists", href: "/tattoo-artists" },
  { id: 3, title: "Lookbook", href: "/lookbook" },
  { id: 4, title: "Booking", href: "/booking" },
  { id: 5, title: "Guest Artist", href: "/guest" },
  { id: 6, title: "Articles", href: "/articles" },
  { id: 7, title: "About us", href: "/about" },
  { id: 8, title: "Contact", href: "/contact" },
];

export const navMenu: NavItem[] = [
  { id: 1, title: "Home", href: "/", icon: <Home /> },
  { id: 2, title: "Artists", href: "/tattoo-artists", icon: <Users /> },
  { id: 3, title: "Lookbook", href: "/lookbook", icon: <Palette /> },
  { id: 4, title: "Booking", href: "/booking", icon: <CalendarClock /> },
  {
    id: 5,
    title: "Articles",
    href: "/articles",
    icon: <BookText className="size-5" />,
  },
];

export const socialMedia = [
  {
    id: 1,
    icon: <FaInstagram size={25} />,
    href: "/",
    className: "bg-linear-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]",
  },
  // {
  //   id: 2,
  //   icon: (
  //     <PiTelegramLogo
  //       size={25}
  //       className="bg-blue-600 text-white rounded-full"
  //     />
  //   ),
  //   href: "/",
  //   className: "bg-white",
  // },
  {
    id: 3,
    icon: <FaWhatsapp size={25} />,
    href: "/",
    className: "bg-green-500",
  },
  // {
  //   id: 4,
  //   icon: <BsTwitterX size={25} />,
  //   href: "/",
  //   className: "bg-black",
  // },
];

export const HomePageContent = [
  {
    id: 1,
    title: "Artists",
    linkHref: "/tattoo-artists",
    imgSrc: "/images/gallery/IMG_3381.JPG",
  },
  {
    id: 2,
    title: "Lookbook",
    linkHref: "/lookbook",
    imgSrc: "/images/gallery/IMG_0257.PNG",
  },
  {
    id: 3,
    title: "Articles",
    linkHref: "/articles",
    imgSrc: "/images/gallery/IMG_0258.jpg",
  },
  {
    id: 4,
    title: "Contact",
    linkHref: "/contact",
    imgSrc: "/images/gallery/IMG_0257.PNG",
  },
];

export const AdminSidebarItems: NavItem[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: <LayoutDashboard className="size-5" />,
    href: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Appointments",
    icon: <ClipboardCheck className="size-5" />,
    href: "/admin/appointments",
  },
  {
    id: 3,
    title: "Tattoo Artists",
    icon: <Palette className="size-5" />,
    href: "/admin/tattoo-artists",
  },
  {
    id: 4,
    title: "Booking",
    icon: <CalendarClock className="size-5" />,
    href: "/admin/booking",
  },
  {
    id: 5,
    title: "Guest Artist",
    icon: <Users className="size-5" />,
    href: "/admin/guest-artist",
  },
  {
    id: 6,
    title: "Articles",
    icon: <BookText className="size-5" />,
    href: "/admin/articles",
  },
  {
    id: 7,
    title: "Payments",
    icon: <Wallet className="size-5" />,
    href: "/admin/payments",
  },
];

export const AdminBudgetRange = [
  { id: 1, label: "under 200 €", value: "UNDER_200" },
  { id: 2, label: "200-400 €", value: "B200_400" },
  { id: 3, label: "400-700 €", value: "B400_700" },
  { id: 4, label: "700-1000 €", value: "B700_1000" },
  { id: 5, label: "1000-1500 €", value: "B1000_1500" },
  { id: 6, label: "1500-2000 €", value: "B1500_2000" },
  { id: 7, label: "over 2000 €", value: "OVER_2000" },
] as const;

export const PublicBudgetRange = [
  { id: 1, label: "under 200 €", value: "UNDER_200" },
  { id: 2, label: "200-400 €", value: "_200_400" },
  { id: 3, label: "400-700 €", value: "_400_700" },
  { id: 4, label: "700-1000 €", value: "_700_1000" },
  { id: 5, label: "1000-1500 €", value: "_1000_1500" },
  { id: 6, label: "1500-2000 €", value: "_1500_2000" },
  { id: 7, label: "over 2000 €", value: "OVER_2000" },
];

export const BookingStatus = [
  { id: 1, value: "PENDING_CONSULT", label: "Pending" },
  { id: 2, value: "CONSULT_APPROVED", label: "Approved" },
  { id: 3, value: "CONSULT_NO_SHOW", label: "Not Showing" },
  { id: 4, value: "TATTOO_SCHEDULED", label: "Scheduled" },
  { id: 5, value: "COMPLETED", label: "Completed" },
  { id: 6, value: "CANCELLED", label: "Cancelled" },
];

export const BookingStatusCancelReason = [
  { id: 1, value: "CLIENT_CANCELLED", label: "Client Cancelled" },
  { id: 2, value: "NO_SHOW", label: "Not Showing" },
  { id: 3, value: "STUDIO_CANCELLED", label: "Studio Cancelled" },
  { id: 4, value: "OTHER", label: "Other" },
];

export const budgetMap: Record<string, string> = Object.fromEntries(
  AdminBudgetRange.map((item) => [item.value, item.label]),
);

export const bookingStatusMap: Record<string, string> = Object.fromEntries(
  BookingStatus.map((status) => [status.value, status.label]),
);

export const bookingStatusCancelReasonMap: Record<string, string> =
  Object.fromEntries(
    BookingStatusCancelReason.map((reason) => [reason.value, reason.label]),
  );
