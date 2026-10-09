import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ConfirmarePage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Cererea ta a fost primită!</h1>
        <p className="text-lg text-slate-600 mb-8">
          Vom reveni cu o confirmare cât mai curând posibil.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 text-left rounded-r-lg">
          <p className="text-sm text-amber-800 font-medium">
            <strong>Notă importantă:</strong> Aceasta NU este o confirmare a programării. Vei primi un email sau SMS cu data și ora exactă a vizitei.
          </p>
        </div>

        <div className="text-left mb-10">
          <h3 className="font-semibold text-slate-900 mb-5 text-lg">Ce urmează?</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">1</span>
              <span className="text-slate-700 leading-relaxed">Verificăm disponibilitatea pentru data și ora solicitată în calendarul nostru.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">2</span>
              <span className="text-slate-700 leading-relaxed">Confirmăm programarea finală telefonic sau pe email în cel mai scurt timp.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">3</span>
              <span className="text-slate-700 leading-relaxed">Primești un reminder (memento) automat înainte de vizita la service.</span>
            </li>
          </ul>
        </div>

        <Link 
          href="/"
          className="inline-block w-full py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors text-lg"
        >
          Înapoi la pagina principală
        </Link>
      </div>
    </div>
  );
}
