import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { orderFormSchema, calculateOrderPrice } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = orderFormSchema.parse(body);

    const calculation = calculateOrderPrice(validatedData.quantity);
    const orderNumber = `FPF-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: validatedData.customerName,
        mobileNumber: validatedData.mobileNumber,
        village: validatedData.village,
        fullAddress: validatedData.fullAddress,
        productName: 'गावराण अंडी',
        quantity: validatedData.quantity,
        unitPrice: calculation.unitPrice,
        subtotal: calculation.subtotal,
        discountPercent: calculation.discountPercent,
        discountAmount: calculation.discountAmount,
        finalAmount: calculation.finalAmount,
        deliveryCharge: 0,
        paymentMethod: validatedData.paymentMethod,
        utrNumber: validatedData.paymentMethod === 'ONLINE' ? validatedData.utrNumber : 'लागू नाही',
        notes: validatedData.notes || '',
        status: 'RECEIVED',
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message || 'ऑर्डर नोंदवताना त्रुटी आली.' },
      { status: 400 }
    );
  }
}
