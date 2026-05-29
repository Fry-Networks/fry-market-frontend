/* eslint-disable */
// @ts-nocheck
/**
 * This file was automatically generated from ARC56 app spec.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import type {
  ABIAppCallArg,
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  AppCompilationResult,
  AppReference,
  AppState,
  AppStorageSchema,
  CoreAppCallArgs,
  RawAppCallArgs,
  TealTemplateParams,
} from '@algorandfoundation/algokit-utils/types/app'
import type {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import type { SendTransactionFrom, SendTransactionParams, SendTransactionResult, TransactionToSign } from '@algorandfoundation/algokit-utils/types/transaction'
import type { ABIResult, TransactionWithSigner } from 'algosdk'
import { Algodv2, AtomicTransactionComposer, modelsv2, OnApplicationComplete, Transaction } from 'algosdk'
export const APP_SPEC: AppSpec = {
  "hints": {
    "create(uint64,address,uint64,uint64,uint64,uint64)void": {
      "call_config": {
        "no_op": "CREATE"
      }
    },
    "bid(pay)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "cancel_bid()void": {
      "call_config": {
        "no_op": "CALL"
      }
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBhbGdvcHkuYXJjNC5BUkM0Q29udHJhY3QuYXBwcm92YWxfcHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGludGNibG9jayAwIDEgOAogICAgYnl0ZWNibG9jayAidG90YWxfYmlkZGVycyIgMHg2MiAiaGlnaGVzdF9iaWQiICJoaWdoZXN0X2JpZGRlciIgImJpZF9zdGFydF9hbW91bnQiICJtaW5fYmlkX2Ftb3VudCIgImJpZGRpbmdfc3RhcnRfdGltZSIgImJpZGRpbmdfZW5kX3RpbWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weToyMwogICAgLy8gY2xhc3MgRnJ5QXVjdGlvbkJpZGRpbmcoQVJDNENvbnRyYWN0KToKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAOAogICAgcHVzaGJ5dGVzcyAweGRiN2ZlODQzIDB4OTQyNTc1ODggLy8gbWV0aG9kICJiaWQocGF5KXZvaWQiLCBtZXRob2QgImNhbmNlbF9iaWQoKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBiaWQgY2FuY2VsX2JpZAogICAgZXJyCgptYWluX2NyZWF0ZV9Ob09wQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weToyMwogICAgLy8gY2xhc3MgRnJ5QXVjdGlvbkJpZGRpbmcoQVJDNENvbnRyYWN0KToKICAgIHB1c2hieXRlcyAweDcxNjZjOWIxIC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCgovLyBzbWFydF9jb250cmFjdHMuZnJ5X2F1Y3Rpb25fYmlkZGluZy5jb250cmFjdC5GcnlBdWN0aW9uQmlkZGluZy5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTozNgogICAgLy8gQGFyYzQuYWJpbWV0aG9kKGNyZWF0ZT0icmVxdWlyZSIpCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo0NgogICAgLy8gc2VsZi5hc3NldF9pZC52YWx1ZSA9IGFzc2V0X2lkCiAgICBwdXNoYnl0ZXMgImFzc2V0X2lkIgogICAgdW5jb3ZlciA2CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9hdWN0aW9uX2JpZGRpbmcvY29udHJhY3QucHk6NDcKICAgIC8vIHNlbGYuc2VsbGVyLnZhbHVlID0gc2VsbGVyCiAgICBwdXNoYnl0ZXMgInNlbGxlciIKICAgIHVuY292ZXIgNQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjQ4CiAgICAvLyBzZWxmLmJpZF9zdGFydF9hbW91bnQudmFsdWUgPSBiaWRfc3RhcnRfYW1vdW50CiAgICBieXRlYyA0IC8vICJiaWRfc3RhcnRfYW1vdW50IgogICAgdW5jb3ZlciA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9hdWN0aW9uX2JpZGRpbmcvY29udHJhY3QucHk6NDkKICAgIC8vIHNlbGYubWluX2JpZF9hbW91bnQudmFsdWUgPSBtaW5fYmlkX2Ftb3VudAogICAgYnl0ZWMgNSAvLyAibWluX2JpZF9hbW91bnQiCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo1MAogICAgLy8gc2VsZi5iaWRkaW5nX3N0YXJ0X3RpbWUudmFsdWUgPSBiaWRkaW5nX3N0YXJ0X3RpbWUKICAgIGJ5dGVjIDYgLy8gImJpZGRpbmdfc3RhcnRfdGltZSIKICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjUxCiAgICAvLyBzZWxmLmJpZGRpbmdfZW5kX3RpbWUudmFsdWUgPSBiaWRkaW5nX2VuZF90aW1lCiAgICBieXRlYyA3IC8vICJiaWRkaW5nX2VuZF90aW1lIgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjUyCiAgICAvLyBzZWxmLmhpZ2hlc3RfYmlkLnZhbHVlID0gVUludDY0KDApCiAgICBieXRlY18yIC8vICJoaWdoZXN0X2JpZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9hdWN0aW9uX2JpZGRpbmcvY29udHJhY3QucHk6NTMKICAgIC8vIHNlbGYuaGlnaGVzdF9iaWRkZXIudmFsdWUgPSBHbG9iYWwuemVyb19hZGRyZXNzCiAgICBieXRlY18zIC8vICJoaWdoZXN0X2JpZGRlciIKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjU0CiAgICAvLyBzZWxmLnRvdGFsX2JpZGRlcnMudmFsdWUgPSBVSW50NjQoMCkKICAgIGJ5dGVjXzAgLy8gInRvdGFsX2JpZGRlcnMiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjM2CiAgICAvLyBAYXJjNC5hYmltZXRob2QoY3JlYXRlPSJyZXF1aXJlIikKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMuZnJ5X2F1Y3Rpb25fYmlkZGluZy5jb250cmFjdC5GcnlBdWN0aW9uQmlkZGluZy5iaWRbcm91dGluZ10oKSAtPiB2b2lkOgpiaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo1NgogICAgLy8gQGFyYzQuYWJpbWV0aG9kCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjU4CiAgICAvLyBhc3NlcnQgR2xvYmFsLmxhdGVzdF90aW1lc3RhbXAgPj0gc2VsZi5iaWRkaW5nX3N0YXJ0X3RpbWUudmFsdWUKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyA2IC8vICJiaWRkaW5nX3N0YXJ0X3RpbWUiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYuYmlkZGluZ19zdGFydF90aW1lIGV4aXN0cwogICAgPj0KICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9hdWN0aW9uX2JpZGRpbmcvY29udHJhY3QucHk6NTkKICAgIC8vIGFzc2VydCBHbG9iYWwubGF0ZXN0X3RpbWVzdGFtcCA8PSBzZWxmLmJpZGRpbmdfZW5kX3RpbWUudmFsdWUKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyA3IC8vICJiaWRkaW5nX2VuZF90aW1lIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBzZWxmLmJpZGRpbmdfZW5kX3RpbWUgZXhpc3RzCiAgICA8PQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo2MAogICAgLy8gYXNzZXJ0IHBheW1lbnQuYW1vdW50ID49IHNlbGYuYmlkX3N0YXJ0X2Ftb3VudC52YWx1ZQogICAgZHVwCiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDQgLy8gImJpZF9zdGFydF9hbW91bnQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYuYmlkX3N0YXJ0X2Ftb3VudCBleGlzdHMKICAgIGRpZyAxCiAgICA8PQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo2MQogICAgLy8gYXNzZXJ0IHBheW1lbnQuYW1vdW50ID49IHNlbGYuaGlnaGVzdF9iaWQudmFsdWUgKyBzZWxmLm1pbl9iaWRfYW1vdW50LnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMiAvLyAiaGlnaGVzdF9iaWQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYuaGlnaGVzdF9iaWQgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgNSAvLyAibWluX2JpZF9hbW91bnQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYubWluX2JpZF9hbW91bnQgZXhpc3RzCiAgICArCiAgICA+PQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo2MgogICAgLy8gYXNzZXJ0IHBheW1lbnQucmVjZWl2ZXIgPT0gR2xvYmFsLmN1cnJlbnRfYXBwbGljYXRpb25fYWRkcmVzcwogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo2NC02NQogICAgLy8gIyBUcmFjayBuZXcgYmlkZGVycyBiZWZvcmUgd3JpdGluZyBib3gKICAgIC8vIGlzX25ldyA9IFR4bi5zZW5kZXIgbm90IGluIHNlbGYuYmlkcwogICAgYnl0ZWNfMSAvLyAweDYyCiAgICB0eG4gU2VuZGVyCiAgICBjb25jYXQKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9hdWN0aW9uX2JpZGRpbmcvY29udHJhY3QucHk6NjYKICAgIC8vIGlmIGlzX25ldzoKICAgIGJueiBiaWRfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo2NwogICAgLy8gc2VsZi50b3RhbF9iaWRkZXJzLnZhbHVlID0gc2VsZi50b3RhbF9iaWRkZXJzLnZhbHVlICsgVUludDY0KDEpCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMCAvLyAidG90YWxfYmlkZGVycyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi50b3RhbF9iaWRkZXJzIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ5dGVjXzAgLy8gInRvdGFsX2JpZGRlcnMiCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKYmlkX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjcxCiAgICAvLyBhbW91bnQ9YXJjNC5VSW50NjQocGF5bWVudC5hbW91bnQpLAogICAgZHVwbiAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo3MgogICAgLy8gdGltZXN0YW1wPWFyYzQuVUludDY0KEdsb2JhbC5sYXRlc3RfdGltZXN0YW1wKSwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjY5LTczCiAgICAvLyAjIEYtMDI6IFdyaXRlIFthbW91bnQsIHRpbWVzdGFtcF0gYXQgb2Zmc2V0IDAg4oCUIGZ1bGwgMTZCIGJveAogICAgLy8gc2VsZi5iaWRzW1R4bi5zZW5kZXJdID0gQmlkVmFsdWUoCiAgICAvLyAgICAgYW1vdW50PWFyYzQuVUludDY0KHBheW1lbnQuYW1vdW50KSwKICAgIC8vICAgICB0aW1lc3RhbXA9YXJjNC5VSW50NjQoR2xvYmFsLmxhdGVzdF90aW1lc3RhbXApLAogICAgLy8gKQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo2OS03MAogICAgLy8gIyBGLTAyOiBXcml0ZSBbYW1vdW50LCB0aW1lc3RhbXBdIGF0IG9mZnNldCAwIOKAlCBmdWxsIDE2QiBib3gKICAgIC8vIHNlbGYuYmlkc1tUeG4uc2VuZGVyXSA9IEJpZFZhbHVlKAogICAgYnl0ZWNfMSAvLyAweDYyCiAgICB0eG4gU2VuZGVyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjY5LTczCiAgICAvLyAjIEYtMDI6IFdyaXRlIFthbW91bnQsIHRpbWVzdGFtcF0gYXQgb2Zmc2V0IDAg4oCUIGZ1bGwgMTZCIGJveAogICAgLy8gc2VsZi5iaWRzW1R4bi5zZW5kZXJdID0gQmlkVmFsdWUoCiAgICAvLyAgICAgYW1vdW50PWFyYzQuVUludDY0KHBheW1lbnQuYW1vdW50KSwKICAgIC8vICAgICB0aW1lc3RhbXA9YXJjNC5VSW50NjQoR2xvYmFsLmxhdGVzdF90aW1lc3RhbXApLAogICAgLy8gKQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9hdWN0aW9uX2JpZGRpbmcvY29udHJhY3QucHk6NzUKICAgIC8vIHNlbGYuaGlnaGVzdF9iaWQudmFsdWUgPSBwYXltZW50LmFtb3VudAogICAgYnl0ZWNfMiAvLyAiaGlnaGVzdF9iaWQiCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9hdWN0aW9uX2JpZGRpbmcvY29udHJhY3QucHk6NzYKICAgIC8vIHNlbGYuaGlnaGVzdF9iaWRkZXIudmFsdWUgPSBUeG4uc2VuZGVyCiAgICBieXRlY18zIC8vICJoaWdoZXN0X2JpZGRlciIKICAgIHR4biBTZW5kZXIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo1NgogICAgLy8gQGFyYzQuYWJpbWV0aG9kCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzLmZyeV9hdWN0aW9uX2JpZGRpbmcuY29udHJhY3QuRnJ5QXVjdGlvbkJpZGRpbmcuY2FuY2VsX2JpZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNhbmNlbF9iaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo4MC04MQogICAgLy8gIyBGLTA1OiBSZWFkIGNhbGxlcidzIE9XTiBib3gsIG5vdCBhIHBhc3NlZC1pbiBhZGRyZXNzCiAgICAvLyBhc3NlcnQgVHhuLnNlbmRlciBpbiBzZWxmLmJpZHMKICAgIGJ5dGVjXzEgLy8gMHg2MgogICAgdHhuIFNlbmRlcgogICAgY29uY2F0CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9hdWN0aW9uX2JpZGRpbmcvY29udHJhY3QucHk6ODIKICAgIC8vIGJpZCA9IHNlbGYuYmlkc1tUeG4uc2VuZGVyXS5jb3B5KCkKICAgIGJ5dGVjXzEgLy8gMHg2MgogICAgdHhuIFNlbmRlcgogICAgY29uY2F0CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5iaWRzIGVudHJ5IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9hdWN0aW9uX2JpZGRpbmcvY29udHJhY3QucHk6ODQtODUKICAgIC8vICMgQ2Fubm90IGNhbmNlbCBpZiB5b3UgYXJlIHRoZSBoaWdoZXN0IGJpZGRlcgogICAgLy8gYXNzZXJ0IFR4bi5zZW5kZXIgIT0gc2VsZi5oaWdoZXN0X2JpZGRlci52YWx1ZQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzMgLy8gImhpZ2hlc3RfYmlkZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBzZWxmLmhpZ2hlc3RfYmlkZGVyIGV4aXN0cwogICAgIT0KICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9hdWN0aW9uX2JpZGRpbmcvY29udHJhY3QucHk6ODcKICAgIC8vIHJlZnVuZF9hbW91bnQgPSBiaWQuYW1vdW50Lm5hdGl2ZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo4OS05MAogICAgLy8gIyBEZWxldGUgYm94IGFuZCB1cGRhdGUgY291bnRlcgogICAgLy8gZGVsIHNlbGYuYmlkc1tUeG4uc2VuZGVyXQogICAgYnl0ZWNfMSAvLyAweDYyCiAgICB0eG4gU2VuZGVyCiAgICBjb25jYXQKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9hdWN0aW9uX2JpZGRpbmcvY29udHJhY3QucHk6OTEKICAgIC8vIHNlbGYudG90YWxfYmlkZGVycy52YWx1ZSA9IHNlbGYudG90YWxfYmlkZGVycy52YWx1ZSAtIFVJbnQ2NCgxKQogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzAgLy8gInRvdGFsX2JpZGRlcnMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYudG90YWxfYmlkZGVycyBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBieXRlY18wIC8vICJ0b3RhbF9iaWRkZXJzIgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjkzLTk3CiAgICAvLyAjIFJlZnVuZCB0aGUgYmlkZGVyCiAgICAvLyBpdHhuLlBheW1lbnQoCiAgICAvLyAgICAgcmVjZWl2ZXI9VHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ9cmVmdW5kX2Ftb3VudCwKICAgIC8vICkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5Ojk1CiAgICAvLyByZWNlaXZlcj1UeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjkzLTk0CiAgICAvLyAjIFJlZnVuZCB0aGUgYmlkZGVyCiAgICAvLyBpdHhuLlBheW1lbnQoCiAgICBpbnRjXzEgLy8gcGF5CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfYXVjdGlvbl9iaWRkaW5nL2NvbnRyYWN0LnB5OjkzLTk3CiAgICAvLyAjIFJlZnVuZCB0aGUgYmlkZGVyCiAgICAvLyBpdHhuLlBheW1lbnQoCiAgICAvLyAgICAgcmVjZWl2ZXI9VHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ9cmVmdW5kX2Ftb3VudCwKICAgIC8vICkuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X2F1Y3Rpb25fYmlkZGluZy9jb250cmFjdC5weTo3OAogICAgLy8gQGFyYzQuYWJpbWV0aG9kCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCg==",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBhbGdvcHkuYXJjNC5BUkM0Q29udHJhY3QuY2xlYXJfc3RhdGVfcHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMQogICAgcmV0dXJuCg=="
  },
  "state": {
    "global": {
      "num_byte_slices": 2,
      "num_uints": 7
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "schema": {
    "global": {
      "declared": {
        "asset_id": {
          "type": "uint64",
          "key": "asset_id"
        },
        "seller": {
          "type": "bytes",
          "key": "seller"
        },
        "bid_start_amount": {
          "type": "uint64",
          "key": "bid_start_amount"
        },
        "min_bid_amount": {
          "type": "uint64",
          "key": "min_bid_amount"
        },
        "bidding_start_time": {
          "type": "uint64",
          "key": "bidding_start_time"
        },
        "bidding_end_time": {
          "type": "uint64",
          "key": "bidding_end_time"
        },
        "highest_bid": {
          "type": "uint64",
          "key": "highest_bid"
        },
        "highest_bidder": {
          "type": "bytes",
          "key": "highest_bidder"
        },
        "total_bidders": {
          "type": "uint64",
          "key": "total_bidders"
        }
      },
      "reserved": {}
    },
    "local": {
      "declared": {},
      "reserved": {}
    }
  },
  "contract": {
    "name": "FryAuctionBidding",
    "methods": [
      {
        "name": "create",
        "args": [
          {
            "type": "uint64",
            "name": "asset_id"
          },
          {
            "type": "address",
            "name": "seller"
          },
          {
            "type": "uint64",
            "name": "bid_start_amount"
          },
          {
            "type": "uint64",
            "name": "min_bid_amount"
          },
          {
            "type": "uint64",
            "name": "bidding_start_time"
          },
          {
            "type": "uint64",
            "name": "bidding_end_time"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "bid",
        "args": [
          {
            "type": "pay",
            "name": "payment"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "cancel_bid",
        "args": [],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      }
    ],
    "networks": {}
  },
  "bare_call_config": {}
} as unknown as AppSpec

export type OnCompleteNoOp = { onCompleteAction?: 'no_op' | OnApplicationComplete.NoOpOC }
export type OnCompleteOptIn = { onCompleteAction: 'opt_in' | OnApplicationComplete.OptInOC }
export type OnCompleteCloseOut = { onCompleteAction: 'close_out' | OnApplicationComplete.CloseOutOC }
export type OnCompleteDelApp = { onCompleteAction: 'delete_application' | OnApplicationComplete.DeleteApplicationOC }
export type OnCompleteUpdApp = { onCompleteAction: 'update_application' | OnApplicationComplete.UpdateApplicationOC }
export type IntegerState = {
  asBigInt(): bigint
  asNumber(): number
}
export type BinaryState = {
  asByteArray(): Uint8Array
  asString(): string
}

export type AppCreateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult> & AppReference
export type AppUpdateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult>

export type AppClientComposeCallCoreParams = Omit<AppClientCallCoreParams, 'sendParams'> & {
  sendParams?: Omit<SendTransactionParams, 'skipSending' | 'atc' | 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources'>
}
export type AppClientComposeExecuteParams = Pick<SendTransactionParams, 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources' | 'suppressLog'>

export type IncludeSchema = {
  schema?: Partial<AppStorageSchema>
}

export type FryAuctionBidding = {
  methods:
  & Record<'create(uint64,address,uint64,uint64,uint64,uint64)void' | 'create', {
    argsObj: {
      assetId: bigint | number
      seller: string
      bidStartAmount: bigint | number
      minBidAmount: bigint | number
      biddingStartTime: bigint | number
      biddingEndTime: bigint | number
    }
    argsTuple: [assetId: bigint | number, seller: string, bidStartAmount: bigint | number, minBidAmount: bigint | number, biddingStartTime: bigint | number, biddingEndTime: bigint | number]
    returns: void
  }>
  & Record<'bid(pay)void' | 'bid', {
    argsObj: {
      payment: TransactionToSign | Transaction | Promise<SendTransactionResult>
    }
    argsTuple: [payment: TransactionToSign | Transaction | Promise<SendTransactionResult>]
    returns: void
  }>
  & Record<'cancel_bid()void' | 'cancelBid', {
    argsObj: {
    }
    argsTuple: []
    returns: void
  }>
  state: {
    global: {
      assetId?: IntegerState
      seller?: BinaryState
      bidStartAmount?: IntegerState
      minBidAmount?: IntegerState
      biddingStartTime?: IntegerState
      biddingEndTime?: IntegerState
      highestBid?: IntegerState
      highestBidder?: BinaryState
      totalBidders?: IntegerState
    }
  }
}

export type FryAuctionBiddingSig = keyof FryAuctionBidding['methods']

export type TypedCallParams<TSignature extends FryAuctionBiddingSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs

export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>

export type MethodArgs<TSignature extends FryAuctionBiddingSig> = FryAuctionBidding['methods'][TSignature]['argsObj' | 'argsTuple']
export type MethodReturn<TSignature extends FryAuctionBiddingSig> = FryAuctionBidding['methods'][TSignature]['returns']

export type FryAuctionBiddingCreateCalls = (typeof FryAuctionBiddingCallFactory)['create']
export type FryAuctionBiddingCreateCallParams =
  | (TypedCallParams<'create(uint64,address,uint64,uint64,uint64,uint64)void'> & (OnCompleteNoOp))

export type FryAuctionBiddingDeployArgs = {
  deployTimeParams?: TealTemplateParams
  createCall?: (callFactory: FryAuctionBiddingCreateCalls) => FryAuctionBiddingCreateCallParams
}

export abstract class FryAuctionBiddingCallFactory {
  static get create() {
    return {
      create(args: MethodArgs<'create(uint64,address,uint64,uint64,uint64,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: 'create(uint64,address,uint64,uint64,uint64,uint64)void' as const,
          methodArgs: Array.isArray(args) ? args : [args.assetId, args.seller, args.bidStartAmount, args.minBidAmount, args.biddingStartTime, args.biddingEndTime],
          ...params,
        }
      },
    }
  }

  static bid(args: MethodArgs<'bid(pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'bid(pay)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.payment],
      ...params,
    }
  }
  static cancelBid(args: MethodArgs<'cancel_bid()void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'cancel_bid()void' as const,
      methodArgs: Array.isArray(args) ? args : [],
      ...params,
    }
  }
}

export class FryAuctionBiddingClient {
  public readonly appClient: ApplicationClient
  private readonly sender: SendTransactionFrom | undefined

  constructor(appDetails: AppDetails, private algod: Algodv2) {
    this.sender = appDetails.sender
    this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod)
  }

  protected mapReturnValue<TReturn, TResult extends AppCallTransactionResult = AppCallTransactionResult>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> & TResult {
    if (result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
    return { ...result, return: returnValue } as AppCallTransactionResultOfType<TReturn> & TResult
  }

  public async call<TSignature extends keyof FryAuctionBidding['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  public deploy(params: FryAuctionBiddingDeployArgs & AppClientDeployCoreParams & IncludeSchema = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(FryAuctionBiddingCallFactory.create)
    return this.appClient.deploy({
      ...params,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  public get create() {
    const $this = this
    return {
      async create(args: MethodArgs<'create(uint64,address,uint64,uint64,uint64,uint64)void'>, params: AppClientCallCoreParams & AppClientCompilationParams & IncludeSchema & CoreAppCallArgs & (OnCompleteNoOp) = {}) {
        return $this.mapReturnValue<MethodReturn<'create(uint64,address,uint64,uint64,uint64,uint64)void'>, AppCreateCallTransactionResult>(await $this.appClient.create(FryAuctionBiddingCallFactory.create.create(args, params)))
      },
    }
  }

  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  public bid(args: MethodArgs<'bid(pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FryAuctionBiddingCallFactory.bid(args, params))
  }

  public cancelBid(args: MethodArgs<'cancel_bid()void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FryAuctionBiddingCallFactory.cancelBid(args, params))
  }

  private static getBinaryState(state: AppState, key: string): BinaryState | undefined {
    const value = state[key]
    if (!value) return undefined
    if (!('valueRaw' in value))
      throw new Error(`Failed to parse state value for ${key}; received an int when expected a byte array`)
    return {
      asString(): string { return value.value },
      asByteArray(): Uint8Array { return value.valueRaw }
    }
  }

  private static getIntegerState(state: AppState, key: string): IntegerState | undefined {
    const value = state[key]
    if (!value) return undefined
    if ('valueRaw' in value)
      throw new Error(`Failed to parse state value for ${key}; received a byte array when expected a number`)
    return {
      asBigInt() { return typeof value.value === 'bigint' ? value.value : BigInt(value.value) },
      asNumber(): number { return typeof value.value === 'bigint' ? Number(value.value) : value.value },
    }
  }

  public async getGlobalState(): Promise<FryAuctionBidding['state']['global']> {
    const state = await this.appClient.getGlobalState()
    return {
      get assetId() { return FryAuctionBiddingClient.getIntegerState(state, 'asset_id') },
      get seller() { return FryAuctionBiddingClient.getBinaryState(state, 'seller') },
      get bidStartAmount() { return FryAuctionBiddingClient.getIntegerState(state, 'bid_start_amount') },
      get minBidAmount() { return FryAuctionBiddingClient.getIntegerState(state, 'min_bid_amount') },
      get biddingStartTime() { return FryAuctionBiddingClient.getIntegerState(state, 'bidding_start_time') },
      get biddingEndTime() { return FryAuctionBiddingClient.getIntegerState(state, 'bidding_end_time') },
      get highestBid() { return FryAuctionBiddingClient.getIntegerState(state, 'highest_bid') },
      get highestBidder() { return FryAuctionBiddingClient.getBinaryState(state, 'highest_bidder') },
      get totalBidders() { return FryAuctionBiddingClient.getIntegerState(state, 'total_bidders') },
    }
  }

  public compose(): FryAuctionBiddingComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain: Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      bid(args: MethodArgs<'bid(pay)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.bid(args, { ...params, sendParams: { ...params?.sendParams, skipSending: true, atc } }))
        resultMappers.push(undefined)
        return this
      },
      cancelBid(args: MethodArgs<'cancel_bid()void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.cancelBid(args, { ...params, sendParams: { ...params?.sendParams, skipSending: true, atc } }))
        resultMappers.push(undefined)
        return this
      },
      clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.clearState({ ...args, sendParams: { ...args?.sendParams, skipSending: true, atc } }))
        resultMappers.push(undefined)
        return this
      },
      addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom) {
        promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client.sender)))
        return this
      },
      async atc() {
        await promiseChain
        return atc
      },
      async simulate(options?: SimulateOptions) {
        await promiseChain
        const result = await atc.simulate(client.algod, new modelsv2.SimulateRequest({ txnGroups: [], ...options }))
        return {
          ...result,
          returns: result.methodResults?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      },
      async execute(sendParams?: AppClientComposeExecuteParams) {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as FryAuctionBiddingComposer
  }
}

export type FryAuctionBiddingComposer<TReturns extends [...any[]] = []> = {
  bid(args: MethodArgs<'bid(pay)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): FryAuctionBiddingComposer<[...TReturns, MethodReturn<'bid(pay)void'>]>
  cancelBid(args: MethodArgs<'cancel_bid()void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): FryAuctionBiddingComposer<[...TReturns, MethodReturn<'cancel_bid()void'>]>
  clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs): FryAuctionBiddingComposer<[...TReturns, undefined]>
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): FryAuctionBiddingComposer<TReturns>
  atc(): Promise<AtomicTransactionComposer>
  simulate(options?: SimulateOptions): Promise<FryAuctionBiddingComposerSimulateResult<TReturns>>
  execute(sendParams?: AppClientComposeExecuteParams): Promise<FryAuctionBiddingComposerResults<TReturns>>
}
export type SimulateOptions = Omit<ConstructorParameters<typeof modelsv2.SimulateRequest>[0], 'txnGroups'>
export type FryAuctionBiddingComposerSimulateResult<TReturns extends [...any[]]> = {
  returns: TReturns
  methodResults: ABIResult[]
  simulateResponse: modelsv2.SimulateResponse
}
export type FryAuctionBiddingComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}
