
'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { DayOfMonthPicker } from '@/components/ui/day-of-month-picker'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Clock, Calendar as CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Settings, Bot, Loader2, Save } from 'lucide-react'
import { getGlobalServiceBotConfigAction, saveGlobalServiceBotConfigAction } from '@/actions/service-actions'
import { useRouter } from 'next/navigation'

interface GlobalServiceSettingsDialogProps {
  trigger?: React.ReactNode
}

export function GlobalServiceSettingsDialog({ trigger }: GlobalServiceSettingsDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [runDay, setRunDay] = useState(1)
  const [runHour, setRunHour] = useState(17)
  const [runMinute, setRunMinute] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      loadConfig()
    }
  }, [open])

  async function loadConfig() {
    setLoading(true)
    try {
      const res = await getGlobalServiceBotConfigAction()
      if (res) {
        setIsEnabled(res.is_enabled)
        if (res.config) {
          setRunDay(res.config.runDay || 1)
          setRunHour(res.config.runHour || 17)
          setRunMinute(res.config.runMinute || 0)
        }
      }
    } catch (error) {
      toast.error('Failed to load global settings')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      await saveGlobalServiceBotConfigAction({
        isEnabled,
        runDay,
        runHour,
        runMinute
      })
      toast.success('Global settings saved')
      setOpen(false)
      router.refresh()
    } catch (error) {
      toast.error('Failed to save global settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="rounded-lg border-slate-200">
            <Settings className="h-4 w-4 mr-2" />
            Global Settings
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-md p-0 flex flex-col gap-0 border-l border-slate-200">
        <SheetHeader className="p-6 border-b bg-slate-50/50">
          <SheetTitle className="flex items-center gap-2 text-slate-900 font-bold">
            <Bot className="h-5 w-5 text-blue-600" />
            Global Service Distribution
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="text-sm">Loading configuration...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-blue-50/30">
                <div className="space-y-0.5">
                  <Label className="text-base font-bold text-slate-900">Enable Global Schedule</Label>
                  <p className="text-xs text-slate-500">Overrides individual service run days</p>
                </div>
                <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <CalendarIcon className="h-3 w-3" />
                    Run Day
                  </Label>
                  <DayOfMonthPicker 
                    value={runDay} 
                    onChange={(day) => setRunDay(day || 1)} 
                    className="h-12 text-base rounded-xl border-slate-200"
                    contentClassName="z-[1200]"
                  />
                  <p className="text-[10px] text-slate-400 italic">Day of month (1-31)</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    Distribution Time (24h)
                  </Label>
                  
                  <div className="flex items-center gap-2">
                    {/* Hour Input + Picker */}
                    <div className="relative flex-1 group">
                      <Input 
                        type="number"
                        min={0}
                        max={23}
                        value={runHour}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val >= 0 && val <= 23) setRunHour(val);
                          else if (e.target.value === '') setRunHour(0);
                        }}
                        className="h-12 rounded-xl border-slate-200 text-center text-base font-bold pr-10 focus:ring-blue-500"
                        placeholder="HH"
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-1 top-1 h-10 w-10 text-slate-400 hover:text-blue-600 rounded-lg"
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-3 rounded-2xl shadow-xl border-slate-200 z-[1200]" align="center">
                          <div className="grid grid-cols-4 gap-1">
                            {Array.from({ length: 24 }, (_, i) => (
                              <Button
                                key={i}
                                variant="ghost"
                                className={cn(
                                  "h-10 w-full p-0 text-sm font-bold rounded-lg",
                                  runHour === i ? "bg-blue-600 text-white hover:bg-blue-700" : "hover:bg-slate-100"
                                )}
                                onClick={() => setRunHour(i)}
                              >
                                {i.toString().padStart(2, '0')}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <span className="text-slate-300 font-bold">:</span>

                    {/* Minute Input */}
                    <div className="relative flex-1">
                      <Input 
                        type="number"
                        min={0}
                        max={59}
                        value={runMinute}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val >= 0 && val <= 59) setRunMinute(val);
                          else if (e.target.value === '') setRunMinute(0);
                        }}
                        className="h-12 rounded-xl border-slate-200 text-center text-base font-bold focus:ring-blue-500"
                        placeholder="MM"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <span className="text-[10px] text-slate-400 font-medium uppercase">min</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between px-1">
                    <p className="text-[10px] text-slate-400 italic">Hours (0-23)</p>
                    <p className="text-[10px] text-slate-400 italic">Minutes (0-59)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                <p className="text-xs text-orange-700 leading-relaxed">
                  <strong>Warning:</strong> When enabled, all services with "Auto Distribute" ON will follow this schedule. Individual service run settings will be ignored.
                </p>
              </div>

              <Button 
                onClick={handleSave} 
                disabled={saving}
                className="w-full rounded-xl h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-100 transition-all"
              >
                {saving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                Save Global Config
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
