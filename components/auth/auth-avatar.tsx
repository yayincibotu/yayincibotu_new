"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  LogIn,
  UserPlus,
  Settings,
  Crown,
  ChevronDown,
  Loader2,
  Bell,
  BellDot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import UserMenu from "./user-menu"

interface AuthAvatarProps {
  className?: string
  showNotificationBadge?: boolean
  notificationCount?: number
}

export default function AuthAvatar({ 
  className, 
  showNotificationBadge = false,
  notificationCount = 0 
}: AuthAvatarProps) {
  const { state, dispatch } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLButtonElement>(null)
  
  const { user, loading: isLoading } = state

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      dispatch({ type: 'LOGOUT' })
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  const handleAuthRedirect = (type: 'login' | 'register') => {
    const currentPath = window.location.pathname
    const redirectUrl = type === 'login' 
      ? `/auth?mode=login&redirect=${encodeURIComponent(currentPath)}`
      : `/auth?mode=register&redirect=${encodeURIComponent(currentPath)}`
    
    window.location.href = redirectUrl
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={cn("flex items-center", className)}>
        <Button variant="ghost" size="sm" disabled className="gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="hidden sm:inline">Yükleniyor...</span>
        </Button>
      </div>
    )
  }

  // Authenticated user
  if (user) {
    const mockUser = {
      id: user.firebase_uid,
      name: user.display_name || user.email?.split('@')[0] || 'Kullanıcı',
      email: user.email || '',
      avatar: user.photo_url || undefined,
      role: user.role,
      tier: 'premium' as const,
      isOnline: true,
      joinDate: '2024',
      stats: {
        totalOrders: 12,
        totalSpent: 450,
        favoriteCount: 8,
        completionRate: 95
      }
    }

    return (
      <div className={cn("relative", className)}>
        <Button
          ref={avatarRef}
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-2 px-2 py-1 h-auto rounded-full",
            "hover:bg-muted/50 transition-colors duration-200",
            isMenuOpen && "bg-muted/50"
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          disabled={isSigningOut}
        >
          <div className="relative">
            <Avatar className="h-8 w-8 border border-muted">
              <AvatarImage src={user.photo_url || undefined} alt={mockUser.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-sm font-medium">
                {mockUser.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            {/* Online Status */}
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full animate-pulse" />
            
            {/* Notification Badge */}
            {showNotificationBadge && notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notificationCount > 9 ? '9+' : notificationCount}
              </Badge>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <span className="text-sm font-medium truncate max-w-24">
              {mockUser.name}
            </span>
            {isSigningOut ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ChevronDown className={cn(
                "h-3 w-3 transition-transform duration-200",
                isMenuOpen && "rotate-180"
              )} />
            )}
          </div>

          {/* Role Badge */}
          {mockUser.role === 'admin' && (
            <Badge variant="secondary" className="hidden md:flex h-5 px-1.5 text-xs">
              <Crown className="h-3 w-3 mr-1" />
              Admin
            </Badge>
          )}
        </Button>

        {/* User Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <div 
              ref={menuRef}
              className="absolute right-0 top-full mt-2 z-50"
            >
              <UserMenu 
                user={mockUser}
                onSignOut={handleSignOut}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Unauthenticated state
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Notification Bell for guests */}
      <Button
        variant="ghost"
        size="sm"
        className="relative p-2"
        title="Bildirimler (Giriş gerekli)"
      >
        {showNotificationBadge && notificationCount > 0 ? (
          <BellDot className="h-4 w-4" />
        ) : (
          <Bell className="h-4 w-4" />
        )}
      </Button>

      {/* Login Button */}
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => handleAuthRedirect('login')}
      >
        <LogIn className="h-4 w-4" />
        <span className="hidden sm:inline">Giriş</span>
      </Button>

      {/* Register Button */}
      <Button
        variant="default"
        size="sm"
        className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        onClick={() => handleAuthRedirect('register')}
      >
        <UserPlus className="h-4 w-4" />
        <span className="hidden sm:inline">Kayıt Ol</span>
      </Button>
    </div>
  )
} 