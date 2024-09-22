"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect } from 'react'
import Download from './download'


interface Term {
    term: string;
    description: string;
}

export default function Dictionary() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null)
    const [dictionaryData, setDictionaryData] = useState<Term[]>([])

    useEffect(() => {
        fetch('/istihbarat_sozlugu.json')
            .then(response => response.json())
            .then(data => setDictionaryData(data))
            .catch(error => console.error('Error fetching dictionary data:', error))
    }, [])

    const filteredTerms = dictionaryData.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">İstihbarat Terimleri Sözlüğü</h1>
            <div className="flex gap-2 mb-4">
                <Input
                    type="text"
                    placeholder="Bir terim ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <Button onClick={() => setSearchTerm('')}>Temizle</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="h-[400px]">
                    <CardHeader>
                        <CardTitle>Terimler</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px]">
                            {filteredTerms.map((item, index) => (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    className="w-full justify-start font-normal mb-1"
                                    onClick={() => setSelectedTerm(item)}
                                >
                                    {item.term}
                                </Button>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
                <Card className="h-[400px]">
                    <CardHeader>
                        <CardTitle>Açıklaması</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px]">
                            {selectedTerm ? (
                                <div>
                                    <h3 className="font-bold mb-2">{selectedTerm.term}</h3>
                                    <p>{selectedTerm.description}</p>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Select a term to see its description.</p>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
                <Download />
            </div>
        </div>
    )
}