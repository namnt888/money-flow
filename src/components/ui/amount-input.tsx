'use client'

import * as React from 'react'
import { SmartAmountInput } from '@/components/ui/smart-amount-input'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatVietnameseCurrencyText } from '@/lib/number-to-text'

interface AmountInputProps {
    value: number
    onChange: (value: number) => void
    disabled?: boolean
    hint?: string
    min?: number
    max?: number
    step?: number
    className?: string
    label?: string
}

export function AmountInput({
    value,
    onChange,
    disabled = false,
    hint,
    min = 0,
    max,
    step = 1000,
    className,
    label,
}: AmountInputProps) {
    const [isFocused, setIsFocused] = React.useState(false)

    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault()
        const newValue = value + step
        if (max === undefined || newValue <= max) {
            onChange(newValue)
        }
    }

    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault()
        const newValue = value - step
        if (newValue >= min) {
            onChange(newValue)
        }
    }

    // Generate human-readable hint if not provided
    const displayHint = hint || (value !== undefined ? formatVietnameseCurrencyText(value)[0]?.value : '')

    return (
        <div className={cn('space-y-1.5', className)}>
            {label && (
                <label className="text-xs font-medium text-slate-500 ml-1">
                    {label}
                </label>
            )}
            <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                    <SmartAmountInput
                        value={value}
                        onChange={(val) => onChange(val ?? 0)}
                        disabled={disabled}
                        hideLabel
                        hideCurrencyText
                        onFocus={() => setIsFocused(true)}
                        // We don't have onBlur in SmartAmountInputProps but it's handled internally
                    />
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 p-0"
                        onClick={handleDecrement}
                        disabled={disabled || value <= min}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 p-0"
                        onClick={handleIncrement}
                        disabled={disabled || (max !== undefined && value >= max)}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {displayHint && (
                <p className="text-[11px] text-slate-400 italic ml-1">
                    {displayHint}
                </p>
            )}
        </div>
    )
}
