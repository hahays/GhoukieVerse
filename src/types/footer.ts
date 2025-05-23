import React from "react";

export interface FooterLink {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterProps {
    bgColor?: string;
    textColor?: string;
    hoverColor?: string;
    columns?: FooterColumn[];
    copyrightText?: string;
    copyrightHref?: string;
    dividerColor?: string;
    className?: string;
}