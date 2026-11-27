-- Snapshot ONLY eligibility at the owner's request; balances are read at transfer.
create table nova_private.duck45_cohort (
    owner uuid primary key references auth.users(id) on delete cascade
);
insert into nova_private.duck45_cohort(owner)
select n.user_id from (
    select user_id from nova_private.test_wallets union select user_id from public.nova_war_players
    union select user_id from nova_private.saves418 union select user_id from public.nova_rts_saves
    union select user_id from nova_private.telegram_accounts231 union select owner from nova_private.play_purchases348
    union select owner from nova_private.themes383 union select user_id from nova_private.presence293
    union select owner from nova_private.miners251
) n join auth.users u on u.id=n.user_id
where u.created_at <= timestamptz '2026-11-27 14:50:02.310219+00' and not coalesce(u.is_anonymous,false);

-- Open together with the Play release. This protects current Nova balances during review.
create table nova_private.duck45_release (singleton boolean primary key check(singleton), enabled boolean not null);
insert into nova_private.duck45_release values(true,false);
alter table nova_private.duck45_release enable row level security;
revoke all on nova_private.duck45_release from public,anon,authenticated;
create table nova_private.duck45_deliveries (
    owner uuid primary key references auth.users(id) on delete cascade,
    device uuid not null, nova bigint not null check(nova between 0 and 9007199254739991),
    special int not null check(special in (0,500)), welcome int not null check(welcome in (0,500)),
    delivered_at timestamptz not null default now()
);
alter table nova_private.duck45_cohort enable row level security;
alter table nova_private.duck45_deliveries enable row level security;
revoke all on nova_private.duck45_cohort,nova_private.duck45_deliveries from public,anon,authenticated;

create function public.duck45_claim(device_id uuid, expected_owner uuid, visible_nova bigint default null)
returns jsonb language plpgsql security definer set search_path='' as $$
declare
    uid uuid:=auth.uid(); prior boolean; special int; welcome int:=0;
    w nova_private.test_wallets%rowtype; saved jsonb; opening bigint;
    receipt nova_private.duck45_deliveries%rowtype;
begin
    if uid is null or uid is distinct from expected_owner or device_id is null or
       not exists(select 1 from auth.users where id=uid and not coalesce(is_anonymous,false)) then
        raise exception 'account_mismatch';
    end if;
    if not exists(select 1 from nova_private.duck45_release where enabled) then
        return jsonb_build_object('state','not_open');
    end if;
    perform pg_advisory_xact_lock(hashtextextended('duck45:'||uid::text,0));
    select * into receipt from nova_private.duck45_deliveries where owner=uid;
    if found then
        if receipt.device<>device_id then return jsonb_build_object('state','already_delivered','owner',uid); end if;
    else
        select exists(select 1 from nova_private.duck45_cohort where owner=uid) into prior;
        special:=case when prior then 500 else 0 end;
        perform pg_advisory_xact_lock(153014,1); -- serialize with old Nova welcome claims
        select * into w from nova_private.test_wallets where user_id=uid for update;
        select s.save->'gems' into saved from nova_private.saves418 s where user_id=uid;
        if saved is null then select s.payload->'gems' into saved from public.nova_rts_saves s where user_id=uid; end if;
        opening:=coalesce((saved::text)::bigint,w.gems,0);
        if visible_nova is not null and visible_nova<>opening then
            return jsonb_build_object('state','needs_reconciliation','owner',uid);
        end if;
        if w.welcome_claimed247 is null and exists(select 1 from auth.users u cross join nova_private.welcome_settings247 s
                                                  where u.id=uid and u.created_at>=s.starts_at) then
            -- Use the SAME welcome receipt as Nova. The Duck credit is delivered below.
            insert into nova_private.test_wallets(user_id,welcome_claimed247,welcome_id247)
                values(uid,now(),gen_random_uuid()) on conflict(user_id) do update
                set welcome_claimed247=excluded.welcome_claimed247,welcome_id247=excluded.welcome_id247
                where test_wallets.welcome_claimed247 is null;
            if found then welcome:=500; end if;
        end if;
        insert into nova_private.duck45_deliveries(owner,device,nova,special,welcome)
            values(uid,device_id,opening,special,welcome) returning * into receipt;
    end if;
    return jsonb_build_object('state','ready','owner',uid,'nova',receipt.nova,'bonus',receipt.special,'welcome',receipt.welcome);
end $$;
revoke all on function public.duck45_claim(uuid,uuid,bigint) from public,anon;
grant execute on function public.duck45_claim(uuid,uuid,bigint) to authenticated;
