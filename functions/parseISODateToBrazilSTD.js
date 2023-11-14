export function parseISODateToBrazilSTD(dataISO) {
    if (!dataISO) return 'Registro sem data';
  
    let date;
    try {
      // Tenta converter a string ISO para um objeto Date
      date = new Date(dataISO);
    } catch (err) {
      return new Error('Data inválida');
    }
  
    // Verifica se a data é válida
    if (isNaN(date.getTime())) return new Error('Data inválida');
  
    // Ajusta o fuso horário para UTC-3 (Horário padrão de Brasília)
    const offset = date.getTimezoneOffset() + 180; // 180 minutos para UTC-3
    date.setMinutes(date.getMinutes() - offset);
  
    // Formata a data para o formato desejado (dd/MM/yyyy HH:mm:ss)
    const pad = (num) => num.toString().padStart(2, '0');
    const formattedDate = [
      pad(date.getDate()),
      pad(date.getMonth() + 1),
      date.getFullYear()
    ].join('/') + ' ' + [
      pad(date.getHours()),
      pad(date.getMinutes()),
      pad(date.getSeconds())
    ].join(':');
  
    return formattedDate;
  }
  