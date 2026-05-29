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
    "create(uint64,uint64,uint64)void": {
      "call_config": {
        "no_op": "CREATE"
      }
    },
    "update_primary_fee(uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "update_secondary_fee(uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "asset_opt_in(uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "create_collection(uint64,address)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "add_royalty(uint64,uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "list_asset(uint64,uint64,uint64,uint64,axfer)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "update_price(uint64,uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "cancel_list(uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "buy_nft_royalty(uint64,pay)void": {
      "call_config": {
        "no_op": "CALL"
      }
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBhbGdvcHkuYXJjNC5BUkM0Q29udHJhY3QuYXBwcm92YWxfcHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIGludGNibG9jayAxIDggMCA0CiAgICBieXRlY2Jsb2NrICJhZG1pbiIgMHg2YyAicHJpbWFyeV9mZWUiICJzZWNvbmRhcnlfZmVlIiAweDYzIDB4MDAwMDAwMDAwMDAwMDAwMQogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MjkKICAgIC8vIGNsYXNzIEZyeU1hcmtldChBUkM0Q29udHJhY3QpOgogICAgdHhuIE51bUFwcEFyZ3MKICAgIGJ6IG1haW5fdXBkYXRlX2FwcGxpY2F0aW9uQDIwCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDE2CiAgICBwdXNoYnl0ZXNzIDB4ODgxNTIzODcgMHg5ZmY3NTE4MiAweDQzNWIwODA5IDB4NzAxZWE3NjEgMHgzYjZmNjYzMSAweDlkYWVlNDQ3IDB4MzE4ZjY2OGQgMHg1ZjI5NWYyMyAweGY0OGI2NzE4IC8vIG1ldGhvZCAidXBkYXRlX3ByaW1hcnlfZmVlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1cGRhdGVfc2Vjb25kYXJ5X2ZlZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAiYXNzZXRfb3B0X2luKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjcmVhdGVfY29sbGVjdGlvbih1aW50NjQsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJhZGRfcm95YWx0eSh1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgImxpc3RfYXNzZXQodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGF4ZmVyKXZvaWQiLCBtZXRob2QgInVwZGF0ZV9wcmljZSh1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgImNhbmNlbF9saXN0KHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJidXlfbmZ0X3JveWFsdHkodWludDY0LHBheSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggdXBkYXRlX3ByaW1hcnlfZmVlIHVwZGF0ZV9zZWNvbmRhcnlfZmVlIGFzc2V0X29wdF9pbiBjcmVhdGVfY29sbGVjdGlvbiBhZGRfcm95YWx0eSBsaXN0X2Fzc2V0IHVwZGF0ZV9wcmljZSBjYW5jZWxfbGlzdCBidXlfbmZ0X3JveWFsdHkKICAgIGVycgoKbWFpbl9jcmVhdGVfTm9PcEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjI5CiAgICAvLyBjbGFzcyBGcnlNYXJrZXQoQVJDNENvbnRyYWN0KToKICAgIHB1c2hieXRlcyAweDdlZmRhNGQyIC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCx1aW50NjQsdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfYXBwbGljYXRpb25AMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxODEKICAgIC8vIEBhcmM0LmJhcmVtZXRob2QoYWxsb3dfYWN0aW9ucz1bIlVwZGF0ZUFwcGxpY2F0aW9uIl0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBpbnRjXzMgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTgzLTE4NAogICAgLy8gIyBGLTAzOiBPbmx5IGFkbWluIGNhbiB1cGRhdGUgdGhlIGFwcGxpY2F0aW9uCiAgICAvLyBhc3NlcnQgVHhuLnNlbmRlciA9PSBzZWxmLmFkbWluLnZhbHVlCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzIgLy8gMAogICAgYnl0ZWNfMCAvLyAiYWRtaW4iCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYuYWRtaW4gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxODEKICAgIC8vIEBhcmM0LmJhcmVtZXRob2QoYWxsb3dfYWN0aW9ucz1bIlVwZGF0ZUFwcGxpY2F0aW9uIl0pCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzLmZyeV9tYXJrZXQuY29udHJhY3QuRnJ5TWFya2V0LmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjM5CiAgICAvLyBAYXJjNC5hYmltZXRob2QoY3JlYXRlPSJyZXF1aXJlIikKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjQxCiAgICAvLyBzZWxmLmFkbWluLnZhbHVlID0gVHhuLnNlbmRlcgogICAgYnl0ZWNfMCAvLyAiYWRtaW4iCiAgICB0eG4gU2VuZGVyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NDIKICAgIC8vIHNlbGYuZnJ5X2lkLnZhbHVlID0gZnJ5X2lkCiAgICBwdXNoYnl0ZXMgImZyeV9pZCIKICAgIHVuY292ZXIgMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjQzCiAgICAvLyBzZWxmLnByaW1hcnlfZmVlLnZhbHVlID0gcHJpbWFyeV9mZWUKICAgIGJ5dGVjXzIgLy8gInByaW1hcnlfZmVlIgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NDQKICAgIC8vIHNlbGYuc2Vjb25kYXJ5X2ZlZS52YWx1ZSA9IHNlY29uZGFyeV9mZWUKICAgIGJ5dGVjXzMgLy8gInNlY29uZGFyeV9mZWUiCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MzkKICAgIC8vIEBhcmM0LmFiaW1ldGhvZChjcmVhdGU9InJlcXVpcmUiKQogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5mcnlfbWFya2V0LmNvbnRyYWN0LkZyeU1hcmtldC51cGRhdGVfcHJpbWFyeV9mZWVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVfcHJpbWFyeV9mZWU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weTo0NgogICAgLy8gQGFyYzQuYWJpbWV0aG9kCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weTo0OAogICAgLy8gYXNzZXJ0IFR4bi5zZW5kZXIgPT0gc2VsZi5hZG1pbi52YWx1ZQogICAgdHhuIFNlbmRlcgogICAgaW50Y18yIC8vIDAKICAgIGJ5dGVjXzAgLy8gImFkbWluIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBzZWxmLmFkbWluIGV4aXN0cwogICAgPT0KICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NDkKICAgIC8vIHNlbGYucHJpbWFyeV9mZWUudmFsdWUgPSBmZWUKICAgIGJ5dGVjXzIgLy8gInByaW1hcnlfZmVlIgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjQ2CiAgICAvLyBAYXJjNC5hYmltZXRob2QKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMuZnJ5X21hcmtldC5jb250cmFjdC5GcnlNYXJrZXQudXBkYXRlX3NlY29uZGFyeV9mZWVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVfc2Vjb25kYXJ5X2ZlZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjUxCiAgICAvLyBAYXJjNC5hYmltZXRob2QKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjUzCiAgICAvLyBhc3NlcnQgVHhuLnNlbmRlciA9PSBzZWxmLmFkbWluLnZhbHVlCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzIgLy8gMAogICAgYnl0ZWNfMCAvLyAiYWRtaW4iCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYuYWRtaW4gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weTo1NAogICAgLy8gc2VsZi5zZWNvbmRhcnlfZmVlLnZhbHVlID0gZmVlCiAgICBieXRlY18zIC8vICJzZWNvbmRhcnlfZmVlIgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjUxCiAgICAvLyBAYXJjNC5hYmltZXRob2QKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMuZnJ5X21hcmtldC5jb250cmFjdC5GcnlNYXJrZXQuYXNzZXRfb3B0X2luW3JvdXRpbmddKCkgLT4gdm9pZDoKYXNzZXRfb3B0X2luOgogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NTYKICAgIC8vIEBhcmM0LmFiaW1ldGhvZAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NTgKICAgIC8vIGFzc2VydCBUeG4uc2VuZGVyID09IHNlbGYuYWRtaW4udmFsdWUKICAgIHR4biBTZW5kZXIKICAgIGludGNfMiAvLyAwCiAgICBieXRlY18wIC8vICJhZG1pbiIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5hZG1pbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjU5LTYzCiAgICAvLyBpdHhuLkFzc2V0VHJhbnNmZXIoCiAgICAvLyAgICAgeGZlcl9hc3NldD1hc3NldCwKICAgIC8vICAgICBhc3NldF9yZWNlaXZlcj1HbG9iYWwuY3VycmVudF9hcHBsaWNhdGlvbl9hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0X2Ftb3VudD0wLAogICAgLy8gKS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NjEKICAgIC8vIGFzc2V0X3JlY2VpdmVyPUdsb2JhbC5jdXJyZW50X2FwcGxpY2F0aW9uX2FkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NjIKICAgIC8vIGFzc2V0X2Ftb3VudD0wLAogICAgaW50Y18yIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjU5CiAgICAvLyBpdHhuLkFzc2V0VHJhbnNmZXIoCiAgICBpbnRjXzMgLy8gYXhmZXIKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMiAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NTktNjMKICAgIC8vIGl0eG4uQXNzZXRUcmFuc2ZlcigKICAgIC8vICAgICB4ZmVyX2Fzc2V0PWFzc2V0LAogICAgLy8gICAgIGFzc2V0X3JlY2VpdmVyPUdsb2JhbC5jdXJyZW50X2FwcGxpY2F0aW9uX2FkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRfYW1vdW50PTAsCiAgICAvLyApLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NTYKICAgIC8vIEBhcmM0LmFiaW1ldGhvZAogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5mcnlfbWFya2V0LmNvbnRyYWN0LkZyeU1hcmtldC5jcmVhdGVfY29sbGVjdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZV9jb2xsZWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NjUKICAgIC8vIEBhcmM0LmFiaW1ldGhvZAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NjcKICAgIC8vIGFzc2VydCBUeG4uc2VuZGVyID09IHNlbGYuYWRtaW4udmFsdWUKICAgIHR4biBTZW5kZXIKICAgIGludGNfMiAvLyAwCiAgICBieXRlY18wIC8vICJhZG1pbiIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5hZG1pbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjY4CiAgICAvLyBzZWxmLmNvbGxlY3Rpb25zW2NvbGxlY3Rpb25faWRdID0gY3JlYXRvcgogICAgc3dhcAogICAgaXRvYgogICAgYnl0ZWMgNCAvLyAweDYzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjY1CiAgICAvLyBAYXJjNC5hYmltZXRob2QKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMuZnJ5X21hcmtldC5jb250cmFjdC5GcnlNYXJrZXQuYWRkX3JveWFsdHlbcm91dGluZ10oKSAtPiB2b2lkOgphZGRfcm95YWx0eToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjcwCiAgICAvLyBAYXJjNC5hYmltZXRob2QKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjcyLTczCiAgICAvLyAjIEYtMDE6IE9ubHkgdGhlIGNvbGxlY3Rpb24gY3JlYXRvciBjYW4gc2V0IHJveWFsdGllcwogICAgLy8gY29sbGVjdGlvbl9jcmVhdG9yID0gc2VsZi5jb2xsZWN0aW9uc1tjb2xsZWN0aW9uX2lkXQogICAgc3dhcAogICAgaXRvYgogICAgYnl0ZWMgNCAvLyAweDYzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBjaGVjayBzZWxmLmNvbGxlY3Rpb25zIGVudHJ5IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NzQKICAgIC8vIGFzc2VydCBUeG4uc2VuZGVyID09IGNvbGxlY3Rpb25fY3JlYXRvcgogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NzUKICAgIC8vIHNlbGYucm95YWx0aWVzW1R4bi5zZW5kZXJdID0gcm95YWx0eV9wZXJjZW50CiAgICBwdXNoYnl0ZXMgMHg3MgogICAgdHhuIFNlbmRlcgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weTo3MAogICAgLy8gQGFyYzQuYWJpbWV0aG9kCiAgICBpbnRjXzAgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzLmZyeV9tYXJrZXQuY29udHJhY3QuRnJ5TWFya2V0Lmxpc3RfYXNzZXRbcm91dGluZ10oKSAtPiB2b2lkOgpsaXN0X2Fzc2V0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6NzcKICAgIC8vIEBhcmM0LmFiaW1ldGhvZAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMCAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6ODYKICAgIC8vIGFzc2VydCBuZnRfdHhuLmFzc2V0X3JlY2VpdmVyID09IEdsb2JhbC5jdXJyZW50X2FwcGxpY2F0aW9uX2FkZHJlc3MKICAgIGR1cAogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5Ojg3CiAgICAvLyBhc3NlcnQgbmZ0X3R4bi54ZmVyX2Fzc2V0ID09IGFzc2V0CiAgICBkdXAKICAgIGd0eG5zIFhmZXJBc3NldAogICAgZGlnIDUKICAgID09CiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5Ojg4CiAgICAvLyBhc3NlcnQgbmZ0X3R4bi5hc3NldF9hbW91bnQgPT0gVUludDY0KDEpCiAgICBndHhucyBBc3NldEFtb3VudAogICAgaW50Y18wIC8vIDEKICAgID09CiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjkwCiAgICAvLyBzZWxsZXI9YXJjNC5BZGRyZXNzKFR4bi5zZW5kZXIpLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6OTMKICAgIC8vIGxpc3RlZF9hdD1hcmM0LlVJbnQ2NChHbG9iYWwubGF0ZXN0X3RpbWVzdGFtcCksCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weTo4OS05NwogICAgLy8gc2VsZi5saXN0aW5nc1thc3NldC5pZF0gPSBMaXN0aW5nVmFsdWUoCiAgICAvLyAgICAgc2VsbGVyPWFyYzQuQWRkcmVzcyhUeG4uc2VuZGVyKSwKICAgIC8vICAgICBwcmljZT1hcmM0LlVJbnQ2NChwcmljZSksCiAgICAvLyAgICAgc3RhdHVzPWFyYzQuVUludDY0KDEpLAogICAgLy8gICAgIGxpc3RlZF9hdD1hcmM0LlVJbnQ2NChHbG9iYWwubGF0ZXN0X3RpbWVzdGFtcCksCiAgICAvLyAgICAgY29sbGVjdGlvbl9pZD1hcmM0LlVJbnQ2NChjb2xsZWN0aW9uX2lkKSwKICAgIC8vICAgICBpc19wcmltYXJ5PWFyYzQuVUludDY0KGlzX3ByaW1hcnkpLAogICAgLy8gICAgIHJlc2VydmVkPWFyYzQuVUludDY0KDApLAogICAgLy8gKQogICAgc3dhcAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjkyCiAgICAvLyBzdGF0dXM9YXJjNC5VSW50NjQoMSksCiAgICBieXRlYyA1IC8vIDB4MDAwMDAwMDAwMDAwMDAwMQogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6ODktOTcKICAgIC8vIHNlbGYubGlzdGluZ3NbYXNzZXQuaWRdID0gTGlzdGluZ1ZhbHVlKAogICAgLy8gICAgIHNlbGxlcj1hcmM0LkFkZHJlc3MoVHhuLnNlbmRlciksCiAgICAvLyAgICAgcHJpY2U9YXJjNC5VSW50NjQocHJpY2UpLAogICAgLy8gICAgIHN0YXR1cz1hcmM0LlVJbnQ2NCgxKSwKICAgIC8vICAgICBsaXN0ZWRfYXQ9YXJjNC5VSW50NjQoR2xvYmFsLmxhdGVzdF90aW1lc3RhbXApLAogICAgLy8gICAgIGNvbGxlY3Rpb25faWQ9YXJjNC5VSW50NjQoY29sbGVjdGlvbl9pZCksCiAgICAvLyAgICAgaXNfcHJpbWFyeT1hcmM0LlVJbnQ2NChpc19wcmltYXJ5KSwKICAgIC8vICAgICByZXNlcnZlZD1hcmM0LlVJbnQ2NCgwKSwKICAgIC8vICkKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weTo5NgogICAgLy8gcmVzZXJ2ZWQ9YXJjNC5VSW50NjQoMCksCiAgICBwdXNoYnl0ZXMgMHgwMDAwMDAwMDAwMDAwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weTo4OS05NwogICAgLy8gc2VsZi5saXN0aW5nc1thc3NldC5pZF0gPSBMaXN0aW5nVmFsdWUoCiAgICAvLyAgICAgc2VsbGVyPWFyYzQuQWRkcmVzcyhUeG4uc2VuZGVyKSwKICAgIC8vICAgICBwcmljZT1hcmM0LlVJbnQ2NChwcmljZSksCiAgICAvLyAgICAgc3RhdHVzPWFyYzQuVUludDY0KDEpLAogICAgLy8gICAgIGxpc3RlZF9hdD1hcmM0LlVJbnQ2NChHbG9iYWwubGF0ZXN0X3RpbWVzdGFtcCksCiAgICAvLyAgICAgY29sbGVjdGlvbl9pZD1hcmM0LlVJbnQ2NChjb2xsZWN0aW9uX2lkKSwKICAgIC8vICAgICBpc19wcmltYXJ5PWFyYzQuVUludDY0KGlzX3ByaW1hcnkpLAogICAgLy8gICAgIHJlc2VydmVkPWFyYzQuVUludDY0KDApLAogICAgLy8gKQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weTo4OQogICAgLy8gc2VsZi5saXN0aW5nc1thc3NldC5pZF0gPSBMaXN0aW5nVmFsdWUoCiAgICBzd2FwCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4NmMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6ODktOTcKICAgIC8vIHNlbGYubGlzdGluZ3NbYXNzZXQuaWRdID0gTGlzdGluZ1ZhbHVlKAogICAgLy8gICAgIHNlbGxlcj1hcmM0LkFkZHJlc3MoVHhuLnNlbmRlciksCiAgICAvLyAgICAgcHJpY2U9YXJjNC5VSW50NjQocHJpY2UpLAogICAgLy8gICAgIHN0YXR1cz1hcmM0LlVJbnQ2NCgxKSwKICAgIC8vICAgICBsaXN0ZWRfYXQ9YXJjNC5VSW50NjQoR2xvYmFsLmxhdGVzdF90aW1lc3RhbXApLAogICAgLy8gICAgIGNvbGxlY3Rpb25faWQ9YXJjNC5VSW50NjQoY29sbGVjdGlvbl9pZCksCiAgICAvLyAgICAgaXNfcHJpbWFyeT1hcmM0LlVJbnQ2NChpc19wcmltYXJ5KSwKICAgIC8vICAgICByZXNlcnZlZD1hcmM0LlVJbnQ2NCgwKSwKICAgIC8vICkKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5Ojc3CiAgICAvLyBAYXJjNC5hYmltZXRob2QKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMuZnJ5X21hcmtldC5jb250cmFjdC5GcnlNYXJrZXQudXBkYXRlX3ByaWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlX3ByaWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6OTkKICAgIC8vIEBhcmM0LmFiaW1ldGhvZAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTAxCiAgICAvLyBsaXN0aW5nID0gc2VsZi5saXN0aW5nc1thc3NldC5pZF0uY29weSgpCiAgICBzd2FwCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4NmMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5saXN0aW5ncyBlbnRyeSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjEwMgogICAgLy8gYXNzZXJ0IGxpc3Rpbmcuc2VsbGVyID09IGFyYzQuQWRkcmVzcyhUeG4uc2VuZGVyKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGR1cAogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTA2CiAgICAvLyBzdGF0dXM9bGlzdGluZy5zdGF0dXMsCiAgICBkaWcgMQogICAgZXh0cmFjdCA0MCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxMDcKICAgIC8vIGxpc3RlZF9hdD1saXN0aW5nLmxpc3RlZF9hdCwKICAgIGRpZyAyCiAgICBleHRyYWN0IDQ4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjEwOAogICAgLy8gY29sbGVjdGlvbl9pZD1saXN0aW5nLmNvbGxlY3Rpb25faWQsCiAgICBkaWcgMwogICAgZXh0cmFjdCA1NiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxMDkKICAgIC8vIGlzX3ByaW1hcnk9bGlzdGluZy5pc19wcmltYXJ5LAogICAgZGlnIDQKICAgIGV4dHJhY3QgNjQgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTEwCiAgICAvLyByZXNlcnZlZD1saXN0aW5nLnJlc2VydmVkLAogICAgdW5jb3ZlciA1CiAgICBleHRyYWN0IDcyIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjEwMy0xMTEKICAgIC8vIHNlbGYubGlzdGluZ3NbYXNzZXQuaWRdID0gTGlzdGluZ1ZhbHVlKAogICAgLy8gICAgIHNlbGxlcj1saXN0aW5nLnNlbGxlciwKICAgIC8vICAgICBwcmljZT1hcmM0LlVJbnQ2NChuZXdfcHJpY2UpLAogICAgLy8gICAgIHN0YXR1cz1saXN0aW5nLnN0YXR1cywKICAgIC8vICAgICBsaXN0ZWRfYXQ9bGlzdGluZy5saXN0ZWRfYXQsCiAgICAvLyAgICAgY29sbGVjdGlvbl9pZD1saXN0aW5nLmNvbGxlY3Rpb25faWQsCiAgICAvLyAgICAgaXNfcHJpbWFyeT1saXN0aW5nLmlzX3ByaW1hcnksCiAgICAvLyAgICAgcmVzZXJ2ZWQ9bGlzdGluZy5yZXNlcnZlZCwKICAgIC8vICkKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA3CiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5Ojk5CiAgICAvLyBAYXJjNC5hYmltZXRob2QKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMuZnJ5X21hcmtldC5jb250cmFjdC5GcnlNYXJrZXQuY2FuY2VsX2xpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpjYW5jZWxfbGlzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjExMwogICAgLy8gQGFyYzQuYWJpbWV0aG9kCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxMTUKICAgIC8vIGxpc3RpbmcgPSBzZWxmLmxpc3RpbmdzW2Fzc2V0LmlkXS5jb3B5KCkKICAgIGR1cAogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDZjCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYubGlzdGluZ3MgZW50cnkgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxMTYKICAgIC8vIGFzc2VydCBsaXN0aW5nLnNlbGxlciA9PSBhcmM0LkFkZHJlc3MoVHhuLnNlbmRlcikKICAgIGV4dHJhY3QgMCAzMgogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTE3LTEyMQogICAgLy8gaXR4bi5Bc3NldFRyYW5zZmVyKAogICAgLy8gICAgIHhmZXJfYXNzZXQ9YXNzZXQsCiAgICAvLyAgICAgYXNzZXRfcmVjZWl2ZXI9VHhuLnNlbmRlciwKICAgIC8vICAgICBhc3NldF9hbW91bnQ9MSwKICAgIC8vICkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjExOQogICAgLy8gYXNzZXRfcmVjZWl2ZXI9VHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjEyMAogICAgLy8gYXNzZXRfYW1vdW50PTEsCiAgICBpbnRjXzAgLy8gMQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTE3CiAgICAvLyBpdHhuLkFzc2V0VHJhbnNmZXIoCiAgICBpbnRjXzMgLy8gYXhmZXIKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMiAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTE3LTEyMQogICAgLy8gaXR4bi5Bc3NldFRyYW5zZmVyKAogICAgLy8gICAgIHhmZXJfYXNzZXQ9YXNzZXQsCiAgICAvLyAgICAgYXNzZXRfcmVjZWl2ZXI9VHhuLnNlbmRlciwKICAgIC8vICAgICBhc3NldF9hbW91bnQ9MSwKICAgIC8vICkuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxMjIKICAgIC8vIGRlbCBzZWxmLmxpc3RpbmdzW2Fzc2V0LmlkXQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxMTMKICAgIC8vIEBhcmM0LmFiaW1ldGhvZAogICAgaW50Y18wIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5mcnlfbWFya2V0LmNvbnRyYWN0LkZyeU1hcmtldC5idXlfbmZ0X3JveWFsdHlbcm91dGluZ10oKSAtPiB2b2lkOgpidXlfbmZ0X3JveWFsdHk6CiAgICBpbnRjXzIgLy8gMAogICAgZHVwbiAyCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjEyNAogICAgLy8gQGFyYzQuYWJpbWV0aG9kCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzAgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18wIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTI2CiAgICAvLyBsaXN0aW5nID0gc2VsZi5saXN0aW5nc1thc3NldC5pZF0uY29weSgpCiAgICBzd2FwCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4NmMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBjaGVjayBzZWxmLmxpc3RpbmdzIGVudHJ5IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTI3CiAgICAvLyBhc3NlcnQgbGlzdGluZy5zdGF0dXMgPT0gYXJjNC5VSW50NjQoMSkKICAgIGR1cAogICAgZXh0cmFjdCA0MCA4CiAgICBieXRlYyA1IC8vIDB4MDAwMDAwMDAwMDAwMDAwMQogICAgYj09CiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjEyOQogICAgLy8gcHJpY2UgPSBsaXN0aW5nLnByaWNlLm5hdGl2ZQogICAgZHVwCiAgICBleHRyYWN0IDMyIDgKICAgIGNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTMwCiAgICAvLyBhc3NlcnQgcGF5bWVudC5hbW91bnQgPj0gcHJpY2UKICAgIGRpZyAyCiAgICBndHhucyBBbW91bnQKICAgIDw9CiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjEzMQogICAgLy8gYXNzZXJ0IHBheW1lbnQucmVjZWl2ZXIgPT0gR2xvYmFsLmN1cnJlbnRfYXBwbGljYXRpb25fYWRkcmVzcwogICAgc3dhcAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxMzMKICAgIC8vIHNlbGxlciA9IGxpc3Rpbmcuc2VsbGVyLm5hdGl2ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjEzNAogICAgLy8gY29sbGVjdGlvbl9pZCA9IGxpc3RpbmcuY29sbGVjdGlvbl9pZC5uYXRpdmUKICAgIGR1cAogICAgZXh0cmFjdCA1NiA4CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxMzUKICAgIC8vIGlzX3ByaW1hcnkgPSBsaXN0aW5nLmlzX3ByaW1hcnkubmF0aXZlCiAgICBkdXAKICAgIGV4dHJhY3QgNjQgOAogICAgc3dhcAogICAgcHVzaGludCA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjEzNy0xMzgKICAgIC8vICMgUGxhdGZvcm0gZmVlCiAgICAvLyBpZiBpc19wcmltYXJ5OgogICAgYnogYnV5X25mdF9yb3lhbHR5X2Vsc2VfYm9keUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxMzkKICAgIC8vIGZlZV9icHMgPSBzZWxmLnByaW1hcnlfZmVlLnZhbHVlCiAgICBpbnRjXzIgLy8gMAogICAgYnl0ZWNfMiAvLyAicHJpbWFyeV9mZWUiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYucHJpbWFyeV9mZWUgZXhpc3RzCgpidXlfbmZ0X3JveWFsdHlfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTQyCiAgICAvLyBmZWVfYW1vdW50ID0gcHJpY2UgKiBmZWVfYnBzIC8vIFVJbnQ2NCgxMDAwMCkKICAgIGRpZyA0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgKgogICAgcHVzaGludCAxMDAwMAogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTQzCiAgICAvLyBzZWxsZXJfYW1vdW50ID0gcHJpY2UgLSBmZWVfYW1vdW50CiAgICAtCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE0NS0xNDYKICAgIC8vICMgUm95YWx0eSB0byBjb2xsZWN0aW9uIGNyZWF0b3IgKGlmIHNldCkKICAgIC8vIGlmIGNvbGxlY3Rpb25faWQgaW4gc2VsZi5jb2xsZWN0aW9uczoKICAgIGJ5dGVjIDQgLy8gMHg2MwogICAgZGlnIDIKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDEyCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGJ1eV9uZnRfcm95YWx0eV9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE0NwogICAgLy8gY3JlYXRvciA9IHNlbGYuY29sbGVjdGlvbnNbY29sbGVjdGlvbl9pZF0KICAgIGRpZyAxMAogICAgYm94X2dldAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDE0CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5jb2xsZWN0aW9ucyBlbnRyeSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE0OAogICAgLy8gaWYgY3JlYXRvciBpbiBzZWxmLnJveWFsdGllczoKICAgIHB1c2hieXRlcyAweDcyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSAxMQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBidXlfbmZ0X3JveWFsdHlfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxNDkKICAgIC8vIHJveWFsdHlfYnBzID0gc2VsZi5yb3lhbHRpZXNbY3JlYXRvcl0KICAgIGRpZyA5CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5yb3lhbHRpZXMgZW50cnkgZXhpc3RzCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxNTAKICAgIC8vIHJveWFsdHlfYW1vdW50ID0gcHJpY2UgKiByb3lhbHR5X2JwcyAvLyBVSW50NjQoMTAwMDApCiAgICBkaWcgNAogICAgKgogICAgcHVzaGludCAxMDAwMAogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTUxCiAgICAvLyBzZWxsZXJfYW1vdW50ID0gc2VsbGVyX2Ftb3VudCAtIHJveWFsdHlfYW1vdW50CiAgICBkaWcgOQogICAgZGlnIDEKICAgIC0KICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE1Mi0xNTUKICAgIC8vIGl0eG4uUGF5bWVudCgKICAgIC8vICAgICByZWNlaXZlcj1jcmVhdG9yLAogICAgLy8gICAgIGFtb3VudD1yb3lhbHR5X2Ftb3VudCwKICAgIC8vICkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkaWcgMTEKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE1MgogICAgLy8gaXR4bi5QYXltZW50KAogICAgaW50Y18wIC8vIHBheQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18yIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxNTItMTU1CiAgICAvLyBpdHhuLlBheW1lbnQoCiAgICAvLyAgICAgcmVjZWl2ZXI9Y3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ9cm95YWx0eV9hbW91bnQsCiAgICAvLyApLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKYnV5X25mdF9yb3lhbHR5X2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE1Ny0xNjEKICAgIC8vICMgUGF5IHNlbGxlcgogICAgLy8gaXR4bi5QYXltZW50KAogICAgLy8gICAgIHJlY2VpdmVyPXNlbGxlciwKICAgIC8vICAgICBhbW91bnQ9c2VsbGVyX2Ftb3VudCwKICAgIC8vICkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyA4CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZGlnIDIKICAgIGR1cAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTU3LTE1OAogICAgLy8gIyBQYXkgc2VsbGVyCiAgICAvLyBpdHhuLlBheW1lbnQoCiAgICBpbnRjXzAgLy8gcGF5CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzIgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE1Ny0xNjEKICAgIC8vICMgUGF5IHNlbGxlcgogICAgLy8gaXR4bi5QYXltZW50KAogICAgLy8gICAgIHJlY2VpdmVyPXNlbGxlciwKICAgIC8vICAgICBhbW91bnQ9c2VsbGVyX2Ftb3VudCwKICAgIC8vICkuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxNjMtMTY4CiAgICAvLyAjIFRyYW5zZmVyIE5GVCB0byBidXllcgogICAgLy8gaXR4bi5Bc3NldFRyYW5zZmVyKAogICAgLy8gICAgIHhmZXJfYXNzZXQ9YXNzZXQsCiAgICAvLyAgICAgYXNzZXRfcmVjZWl2ZXI9VHhuLnNlbmRlciwKICAgIC8vICAgICBhc3NldF9hbW91bnQ9MSwKICAgIC8vICkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE2NgogICAgLy8gYXNzZXRfcmVjZWl2ZXI9VHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE2NwogICAgLy8gYXNzZXRfYW1vdW50PTEsCiAgICBpbnRjXzAgLy8gMQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBkaWcgOAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE2My0xNjQKICAgIC8vICMgVHJhbnNmZXIgTkZUIHRvIGJ1eWVyCiAgICAvLyBpdHhuLkFzc2V0VHJhbnNmZXIoCiAgICBpbnRjXzMgLy8gYXhmZXIKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMiAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTYzLTE2OAogICAgLy8gIyBUcmFuc2ZlciBORlQgdG8gYnV5ZXIKICAgIC8vIGl0eG4uQXNzZXRUcmFuc2ZlcigKICAgIC8vICAgICB4ZmVyX2Fzc2V0PWFzc2V0LAogICAgLy8gICAgIGFzc2V0X3JlY2VpdmVyPVR4bi5zZW5kZXIsCiAgICAvLyAgICAgYXNzZXRfYW1vdW50PTEsCiAgICAvLyApLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTc1CiAgICAvLyBsaXN0ZWRfYXQ9bGlzdGluZy5saXN0ZWRfYXQsCiAgICBkaWcgNgogICAgZHVwCiAgICBleHRyYWN0IDQ4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE3OAogICAgLy8gcmVzZXJ2ZWQ9bGlzdGluZy5yZXNlcnZlZCwKICAgIHN3YXAKICAgIGV4dHJhY3QgNzIgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTcwLTE3OQogICAgLy8gIyBNYXJrIGFzIHNvbGQKICAgIC8vIHNlbGYubGlzdGluZ3NbYXNzZXQuaWRdID0gTGlzdGluZ1ZhbHVlKAogICAgLy8gICAgIHNlbGxlcj1saXN0aW5nLnNlbGxlciwKICAgIC8vICAgICBwcmljZT1saXN0aW5nLnByaWNlLAogICAgLy8gICAgIHN0YXR1cz1hcmM0LlVJbnQ2NCgyKSwKICAgIC8vICAgICBsaXN0ZWRfYXQ9bGlzdGluZy5saXN0ZWRfYXQsCiAgICAvLyAgICAgY29sbGVjdGlvbl9pZD1saXN0aW5nLmNvbGxlY3Rpb25faWQsCiAgICAvLyAgICAgaXNfcHJpbWFyeT1saXN0aW5nLmlzX3ByaW1hcnksCiAgICAvLyAgICAgcmVzZXJ2ZWQ9bGlzdGluZy5yZXNlcnZlZCwKICAgIC8vICkKICAgIHVuY292ZXIgMgogICAgZGlnIDcKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTc0CiAgICAvLyBzdGF0dXM9YXJjNC5VSW50NjQoMiksCiAgICBwdXNoYnl0ZXMgMHgwMDAwMDAwMDAwMDAwMDAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvZnJ5X21hcmtldC9jb250cmFjdC5weToxNzAtMTc5CiAgICAvLyAjIE1hcmsgYXMgc29sZAogICAgLy8gc2VsZi5saXN0aW5nc1thc3NldC5pZF0gPSBMaXN0aW5nVmFsdWUoCiAgICAvLyAgICAgc2VsbGVyPWxpc3Rpbmcuc2VsbGVyLAogICAgLy8gICAgIHByaWNlPWxpc3RpbmcucHJpY2UsCiAgICAvLyAgICAgc3RhdHVzPWFyYzQuVUludDY0KDIpLAogICAgLy8gICAgIGxpc3RlZF9hdD1saXN0aW5nLmxpc3RlZF9hdCwKICAgIC8vICAgICBjb2xsZWN0aW9uX2lkPWxpc3RpbmcuY29sbGVjdGlvbl9pZCwKICAgIC8vICAgICBpc19wcmltYXJ5PWxpc3RpbmcuaXNfcHJpbWFyeSwKICAgIC8vICAgICByZXNlcnZlZD1saXN0aW5nLnJlc2VydmVkLAogICAgLy8gKQogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgZGlnIDMKICAgIGNvbmNhdAogICAgZGlnIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgNwogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2ZyeV9tYXJrZXQvY29udHJhY3QucHk6MTI0CiAgICAvLyBAYXJjNC5hYmltZXRob2QKICAgIGludGNfMCAvLyAxCiAgICByZXR1cm4KCmJ1eV9uZnRfcm95YWx0eV9lbHNlX2JvZHlAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9mcnlfbWFya2V0L2NvbnRyYWN0LnB5OjE0MQogICAgLy8gZmVlX2JwcyA9IHNlbGYuc2Vjb25kYXJ5X2ZlZS52YWx1ZQogICAgaW50Y18yIC8vIDAKICAgIGJ5dGVjXzMgLy8gInNlY29uZGFyeV9mZWUiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYuc2Vjb25kYXJ5X2ZlZSBleGlzdHMKICAgIGIgYnV5X25mdF9yb3lhbHR5X2FmdGVyX2lmX2Vsc2VANAo=",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBhbGdvcHkuYXJjNC5BUkM0Q29udHJhY3QuY2xlYXJfc3RhdGVfcHJvZ3JhbSgpIC0+IHVpbnQ2NDoKbWFpbjoKICAgIHB1c2hpbnQgMQogICAgcmV0dXJuCg=="
  },
  "state": {
    "global": {
      "num_byte_slices": 1,
      "num_uints": 3
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "schema": {
    "global": {
      "declared": {
        "admin": {
          "type": "bytes",
          "key": "admin"
        },
        "fry_id": {
          "type": "uint64",
          "key": "fry_id"
        },
        "primary_fee": {
          "type": "uint64",
          "key": "primary_fee"
        },
        "secondary_fee": {
          "type": "uint64",
          "key": "secondary_fee"
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
    "name": "FryMarket",
    "methods": [
      {
        "name": "create",
        "args": [
          {
            "type": "uint64",
            "name": "fry_id"
          },
          {
            "type": "uint64",
            "name": "primary_fee"
          },
          {
            "type": "uint64",
            "name": "secondary_fee"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "update_primary_fee",
        "args": [
          {
            "type": "uint64",
            "name": "fee"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "update_secondary_fee",
        "args": [
          {
            "type": "uint64",
            "name": "fee"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "asset_opt_in",
        "args": [
          {
            "type": "uint64",
            "name": "asset"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "create_collection",
        "args": [
          {
            "type": "uint64",
            "name": "collection_id"
          },
          {
            "type": "address",
            "name": "creator"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "add_royalty",
        "args": [
          {
            "type": "uint64",
            "name": "collection_id"
          },
          {
            "type": "uint64",
            "name": "royalty_percent"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "list_asset",
        "args": [
          {
            "type": "uint64",
            "name": "asset"
          },
          {
            "type": "uint64",
            "name": "price"
          },
          {
            "type": "uint64",
            "name": "collection_id"
          },
          {
            "type": "uint64",
            "name": "is_primary"
          },
          {
            "type": "axfer",
            "name": "nft_txn"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "update_price",
        "args": [
          {
            "type": "uint64",
            "name": "asset"
          },
          {
            "type": "uint64",
            "name": "new_price"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "cancel_list",
        "args": [
          {
            "type": "uint64",
            "name": "asset"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "buy_nft_royalty",
        "args": [
          {
            "type": "uint64",
            "name": "asset"
          },
          {
            "type": "pay",
            "name": "payment"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      }
    ],
    "networks": {}
  },
  "bare_call_config": {
    "update_application": "CALL"
  }
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

export type FryMarket = {
  methods:
  & Record<'create(uint64,uint64,uint64)void' | 'create', {
    argsObj: {
      fryId: bigint | number
      primaryFee: bigint | number
      secondaryFee: bigint | number
    }
    argsTuple: [fryId: bigint | number, primaryFee: bigint | number, secondaryFee: bigint | number]
    returns: void
  }>
  & Record<'update_primary_fee(uint64)void' | 'updatePrimaryFee', {
    argsObj: {
      fee: bigint | number
    }
    argsTuple: [fee: bigint | number]
    returns: void
  }>
  & Record<'update_secondary_fee(uint64)void' | 'updateSecondaryFee', {
    argsObj: {
      fee: bigint | number
    }
    argsTuple: [fee: bigint | number]
    returns: void
  }>
  & Record<'asset_opt_in(uint64)void' | 'assetOptIn', {
    argsObj: {
      asset: bigint | number
    }
    argsTuple: [asset: bigint | number]
    returns: void
  }>
  & Record<'create_collection(uint64,address)void' | 'createCollection', {
    argsObj: {
      collectionId: bigint | number
      creator: string
    }
    argsTuple: [collectionId: bigint | number, creator: string]
    returns: void
  }>
  & Record<'add_royalty(uint64,uint64)void' | 'addRoyalty', {
    argsObj: {
      collectionId: bigint | number
      royaltyPercent: bigint | number
    }
    argsTuple: [collectionId: bigint | number, royaltyPercent: bigint | number]
    returns: void
  }>
  & Record<'list_asset(uint64,uint64,uint64,uint64,axfer)void' | 'listAsset', {
    argsObj: {
      asset: bigint | number
      price: bigint | number
      collectionId: bigint | number
      isPrimary: bigint | number
      nftTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>
    }
    argsTuple: [asset: bigint | number, price: bigint | number, collectionId: bigint | number, isPrimary: bigint | number, nftTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>]
    returns: void
  }>
  & Record<'update_price(uint64,uint64)void' | 'updatePrice', {
    argsObj: {
      asset: bigint | number
      newPrice: bigint | number
    }
    argsTuple: [asset: bigint | number, newPrice: bigint | number]
    returns: void
  }>
  & Record<'cancel_list(uint64)void' | 'cancelList', {
    argsObj: {
      asset: bigint | number
    }
    argsTuple: [asset: bigint | number]
    returns: void
  }>
  & Record<'buy_nft_royalty(uint64,pay)void' | 'buyNftRoyalty', {
    argsObj: {
      asset: bigint | number
      payment: TransactionToSign | Transaction | Promise<SendTransactionResult>
    }
    argsTuple: [asset: bigint | number, payment: TransactionToSign | Transaction | Promise<SendTransactionResult>]
    returns: void
  }>
  state: {
    global: {
      admin?: BinaryState
      fryId?: IntegerState
      primaryFee?: IntegerState
      secondaryFee?: IntegerState
    }
  }
}

export type FryMarketSig = keyof FryMarket['methods']

export type TypedCallParams<TSignature extends FryMarketSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs

export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>

export type MethodArgs<TSignature extends FryMarketSig> = FryMarket['methods'][TSignature]['argsObj' | 'argsTuple']
export type MethodReturn<TSignature extends FryMarketSig> = FryMarket['methods'][TSignature]['returns']

export type FryMarketCreateCalls = (typeof FryMarketCallFactory)['create']
export type FryMarketCreateCallParams =
  | (TypedCallParams<'create(uint64,uint64,uint64)void'> & (OnCompleteNoOp))

export type FryMarketDeployArgs = {
  deployTimeParams?: TealTemplateParams
  createCall?: (callFactory: FryMarketCreateCalls) => FryMarketCreateCallParams
}

export abstract class FryMarketCallFactory {
  static get create() {
    return {
      create(args: MethodArgs<'create(uint64,uint64,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: 'create(uint64,uint64,uint64)void' as const,
          methodArgs: Array.isArray(args) ? args : [args.fryId, args.primaryFee, args.secondaryFee],
          ...params,
        }
      },
    }
  }

  static updatePrimaryFee(args: MethodArgs<'update_primary_fee(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'update_primary_fee(uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.fee],
      ...params,
    }
  }
  static updateSecondaryFee(args: MethodArgs<'update_secondary_fee(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'update_secondary_fee(uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.fee],
      ...params,
    }
  }
  static assetOptIn(args: MethodArgs<'asset_opt_in(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'asset_opt_in(uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.asset],
      ...params,
    }
  }
  static createCollection(args: MethodArgs<'create_collection(uint64,address)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'create_collection(uint64,address)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.collectionId, args.creator],
      ...params,
    }
  }
  static addRoyalty(args: MethodArgs<'add_royalty(uint64,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'add_royalty(uint64,uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.collectionId, args.royaltyPercent],
      ...params,
    }
  }
  static listAsset(args: MethodArgs<'list_asset(uint64,uint64,uint64,uint64,axfer)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'list_asset(uint64,uint64,uint64,uint64,axfer)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.asset, args.price, args.collectionId, args.isPrimary, args.nftTxn],
      ...params,
    }
  }
  static updatePrice(args: MethodArgs<'update_price(uint64,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'update_price(uint64,uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.asset, args.newPrice],
      ...params,
    }
  }
  static cancelList(args: MethodArgs<'cancel_list(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'cancel_list(uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.asset],
      ...params,
    }
  }
  static buyNftRoyalty(args: MethodArgs<'buy_nft_royalty(uint64,pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'buy_nft_royalty(uint64,pay)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.asset, args.payment],
      ...params,
    }
  }
}

export class FryMarketClient {
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

  public async call<TSignature extends keyof FryMarket['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  public deploy(params: FryMarketDeployArgs & AppClientDeployCoreParams & IncludeSchema = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(FryMarketCallFactory.create)
    return this.appClient.deploy({
      ...params,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  public get create() {
    const $this = this
    return {
      async create(args: MethodArgs<'create(uint64,uint64,uint64)void'>, params: AppClientCallCoreParams & AppClientCompilationParams & IncludeSchema & CoreAppCallArgs & (OnCompleteNoOp) = {}) {
        return $this.mapReturnValue<MethodReturn<'create(uint64,uint64,uint64)void'>, AppCreateCallTransactionResult>(await $this.appClient.create(FryMarketCallFactory.create.create(args, params)))
      },
    }
  }

  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  public updatePrimaryFee(args: MethodArgs<'update_primary_fee(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FryMarketCallFactory.updatePrimaryFee(args, params))
  }

  public updateSecondaryFee(args: MethodArgs<'update_secondary_fee(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FryMarketCallFactory.updateSecondaryFee(args, params))
  }

  public assetOptIn(args: MethodArgs<'asset_opt_in(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FryMarketCallFactory.assetOptIn(args, params))
  }

  public createCollection(args: MethodArgs<'create_collection(uint64,address)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FryMarketCallFactory.createCollection(args, params))
  }

  public addRoyalty(args: MethodArgs<'add_royalty(uint64,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FryMarketCallFactory.addRoyalty(args, params))
  }

  public listAsset(args: MethodArgs<'list_asset(uint64,uint64,uint64,uint64,axfer)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FryMarketCallFactory.listAsset(args, params))
  }

  public updatePrice(args: MethodArgs<'update_price(uint64,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FryMarketCallFactory.updatePrice(args, params))
  }

  public cancelList(args: MethodArgs<'cancel_list(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FryMarketCallFactory.cancelList(args, params))
  }

  public buyNftRoyalty(args: MethodArgs<'buy_nft_royalty(uint64,pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FryMarketCallFactory.buyNftRoyalty(args, params))
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

  public async getGlobalState(): Promise<FryMarket['state']['global']> {
    const state = await this.appClient.getGlobalState()
    return {
      get admin() { return FryMarketClient.getBinaryState(state, 'admin') },
      get fryId() { return FryMarketClient.getIntegerState(state, 'fry_id') },
      get primaryFee() { return FryMarketClient.getIntegerState(state, 'primary_fee') },
      get secondaryFee() { return FryMarketClient.getIntegerState(state, 'secondary_fee') },
    }
  }

  public compose(): FryMarketComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain: Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      updatePrimaryFee(args: MethodArgs<'update_primary_fee(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.updatePrimaryFee(args, { ...params, sendParams: { ...params?.sendParams, skipSending: true, atc } }))
        resultMappers.push(undefined)
        return this
      },
      updateSecondaryFee(args: MethodArgs<'update_secondary_fee(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.updateSecondaryFee(args, { ...params, sendParams: { ...params?.sendParams, skipSending: true, atc } }))
        resultMappers.push(undefined)
        return this
      },
      assetOptIn(args: MethodArgs<'asset_opt_in(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.assetOptIn(args, { ...params, sendParams: { ...params?.sendParams, skipSending: true, atc } }))
        resultMappers.push(undefined)
        return this
      },
      createCollection(args: MethodArgs<'create_collection(uint64,address)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.createCollection(args, { ...params, sendParams: { ...params?.sendParams, skipSending: true, atc } }))
        resultMappers.push(undefined)
        return this
      },
      addRoyalty(args: MethodArgs<'add_royalty(uint64,uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.addRoyalty(args, { ...params, sendParams: { ...params?.sendParams, skipSending: true, atc } }))
        resultMappers.push(undefined)
        return this
      },
      listAsset(args: MethodArgs<'list_asset(uint64,uint64,uint64,uint64,axfer)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.listAsset(args, { ...params, sendParams: { ...params?.sendParams, skipSending: true, atc } }))
        resultMappers.push(undefined)
        return this
      },
      updatePrice(args: MethodArgs<'update_price(uint64,uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.updatePrice(args, { ...params, sendParams: { ...params?.sendParams, skipSending: true, atc } }))
        resultMappers.push(undefined)
        return this
      },
      cancelList(args: MethodArgs<'cancel_list(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.cancelList(args, { ...params, sendParams: { ...params?.sendParams, skipSending: true, atc } }))
        resultMappers.push(undefined)
        return this
      },
      buyNftRoyalty(args: MethodArgs<'buy_nft_royalty(uint64,pay)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.buyNftRoyalty(args, { ...params, sendParams: { ...params?.sendParams, skipSending: true, atc } }))
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
    } as unknown as FryMarketComposer
  }
}

export type FryMarketComposer<TReturns extends [...any[]] = []> = {
  updatePrimaryFee(args: MethodArgs<'update_primary_fee(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): FryMarketComposer<[...TReturns, MethodReturn<'update_primary_fee(uint64)void'>]>
  updateSecondaryFee(args: MethodArgs<'update_secondary_fee(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): FryMarketComposer<[...TReturns, MethodReturn<'update_secondary_fee(uint64)void'>]>
  assetOptIn(args: MethodArgs<'asset_opt_in(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): FryMarketComposer<[...TReturns, MethodReturn<'asset_opt_in(uint64)void'>]>
  createCollection(args: MethodArgs<'create_collection(uint64,address)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): FryMarketComposer<[...TReturns, MethodReturn<'create_collection(uint64,address)void'>]>
  addRoyalty(args: MethodArgs<'add_royalty(uint64,uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): FryMarketComposer<[...TReturns, MethodReturn<'add_royalty(uint64,uint64)void'>]>
  listAsset(args: MethodArgs<'list_asset(uint64,uint64,uint64,uint64,axfer)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): FryMarketComposer<[...TReturns, MethodReturn<'list_asset(uint64,uint64,uint64,uint64,axfer)void'>]>
  updatePrice(args: MethodArgs<'update_price(uint64,uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): FryMarketComposer<[...TReturns, MethodReturn<'update_price(uint64,uint64)void'>]>
  cancelList(args: MethodArgs<'cancel_list(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): FryMarketComposer<[...TReturns, MethodReturn<'cancel_list(uint64)void'>]>
  buyNftRoyalty(args: MethodArgs<'buy_nft_royalty(uint64,pay)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): FryMarketComposer<[...TReturns, MethodReturn<'buy_nft_royalty(uint64,pay)void'>]>
  clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs): FryMarketComposer<[...TReturns, undefined]>
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): FryMarketComposer<TReturns>
  atc(): Promise<AtomicTransactionComposer>
  simulate(options?: SimulateOptions): Promise<FryMarketComposerSimulateResult<TReturns>>
  execute(sendParams?: AppClientComposeExecuteParams): Promise<FryMarketComposerResults<TReturns>>
}
export type SimulateOptions = Omit<ConstructorParameters<typeof modelsv2.SimulateRequest>[0], 'txnGroups'>
export type FryMarketComposerSimulateResult<TReturns extends [...any[]]> = {
  returns: TReturns
  methodResults: ABIResult[]
  simulateResponse: modelsv2.SimulateResponse
}
export type FryMarketComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}
