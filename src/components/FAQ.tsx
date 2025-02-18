import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Apa itu FrameUp?</AccordionTrigger>
        <AccordionContent>
      FrameUp adalah platform sosial modern yang memungkinkan kamu berbagi momen, mengikuti teman, dan menikmati konten dengan cara yang lebih fresh dan seru!
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Bagaimana cara masuk ke FrameUp?</AccordionTrigger>
        <AccordionContent>
      Gampang banget! Kamu bisa sign in pakai akun Google atau GitHub tanpa ribet bikin akun baru.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Apakah FrameUp gratis?</AccordionTrigger>
        <AccordionContent>
      Iya, FrameUp 100% gratis! Kamu bisa menikmati semua fitur tanpa biaya tersembunyi. Cukup daftar dan langsung mulai eksplorasi!
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>Apakah FrameUp punya fitur dark mode?</AccordionTrigger>
        <AccordionContent>
      Tentu! Kamu bisa beralih ke dark mode kapan saja supaya lebih nyaman, terutama buat scrolling malam-malam.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>Bisakah saya mengikuti akun orang lain?</AccordionTrigger>
        <AccordionContent>
      Bisa dong! Kamu bisa follow akun lain untuk melihat update terbaru mereka di feed kamu. Semakin banyak yang kamu follow, makin seru!
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>Apakah bisa mengedit profil saya?</AccordionTrigger>
        <AccordionContent>
      Pastinya! Kamu bisa memperbarui foto profil, username, bio, dan informasi lainnya di pengaturan profil kamu.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>Apakah FrameUp aman digunakan?</AccordionTrigger>
        <AccordionContent>
    Pastinya! Kami selalu berusaha menjaga keamanan dan privasi pengguna. Jangan khawatir, datamu aman bersama kami!
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  );
}
