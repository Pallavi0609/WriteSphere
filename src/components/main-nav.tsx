'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  History,
  LayoutDashboard,
  PenSquare,
  Settings,
  WandSparkles,
  CheckSquare,
  Package,
  Info,
  Mail,
  Save,
} from 'lucide-react';
import { Icons } from '@/components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/playground', icon: WandSparkles, label: 'Playground' },
  { href: '/history', icon: History, label: 'History' },
];

const featureItems = [
  { href: '/outline', icon: FileText, label: 'New Outline' },
  { href: '/draft', icon: PenSquare, label: 'New Draft' },
  { href: '/saved-drafts', icon: Save, label: 'Saved Drafts' },
  { href: '/grammar-check', icon: CheckSquare, label: 'Grammar Check' },
  { href: '/improve-style', icon: WandSparkles, label: 'Improve Style' },
]

const infoItems = [
    { href: '/features', icon: Package, label: 'Features' },
    { href: '/about', icon: Info, label: 'About' },
    { href: '/contact', icon: Mail, label: 'Contact' },
]

export default function MainNav() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
        <SidebarRail />
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Icons.logo className="size-7" />
          <span className="text-lg font-semibold font-headline gradient-text">
            𝓦𝓻𝓲𝓽𝓮𝓢𝓹𝓱𝓮𝓻𝓮
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                icon={<item.icon />}
                tooltip={item.label}
              >
                <Link href={item.href}>{item.label}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
            {featureItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    icon={<item.icon />}
                    tooltip={item.label}
                >
                    <Link href={item.href}>{item.label}</Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
            {infoItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    icon={<item.icon />}
                    tooltip={item.label}
                >
                    <Link href={item.href}>{item.label}</Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          asChild
          icon={<Settings />}
          tooltip="Settings"
          size="icon"
          isActive={pathname === '/settings'}
        >
          <Link href="/settings" />
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
