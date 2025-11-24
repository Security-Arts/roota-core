  return (
    <main style={styles.page}>
      {/* HEADER + About Roota */}
      <header style={styles.headerTop}>
        <div>
          <div style={styles.titleRow}>
            <h1 style={styles.title}>{t.appTitle}</h1>

            {/* language switcher */}
            <div style={styles.langSwitcher}>
              {(["en", "es", "ja"] as Locale[]).map((code) => (
                <button
                  key={code}
                  style={{
                    ...styles.langButton,
                    ...(locale === code ? styles.langButtonActive : {}),
                  }}
                  onClick={() => setLocale(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <p style={styles.subtitle}>{t.tagline}</p>

          {/* технічний рядок + About на мобілці */}
          {isMobile && (
            <>
              <p style={{ marginTop: 6, fontSize: 10, color: "#64748b" }}>
                MVP • Supabase backend • /api/ideas
              </p>
              <div style={{ marginTop: 10 }}>
                <Link
                  href="/about"
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    borderRadius: 999,
                    border: "1px solid #334155",
                    fontSize: 12,
                    textDecoration: "none",
                    color: "#e5e7eb",
                    background:
                      "radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 60%) #020617",
                  }}
                >
                  About Roota
                </Link>
              </div>
            </>
          )}
        </div>

        {/* правий блок — тільки на десктопі/планшеті */}
        {!isMobile && (
          <div style={{ textAlign: "right" as const }}>
            <Link
              href="/about"
              style={{
                display: "inline-block",
                marginBottom: 8,
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid #334155",
                fontSize: 12,
                textDecoration: "none",
                color: "#e5e7eb",
                background:
                  "radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 60%) #020617",
              }}
            >
              About Roota
            </Link>

            <div style={styles.metaBlock}>
              <div>{t.backend}</div>
              <div>{t.endpoint}</div>
              <div>{t.mode}</div>
            </div>
          </div>
        )}
      </header>

      {/* SECTION HEADER */}
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTitle}>{t.liveStream}</div>
        <div style={styles.sectionRight}>
          <div style={styles.sectionCount}>{totalLabel}</div>
          <button style={styles.primaryButton} onClick={handleOpenCreate}>
            {t.newIdeaButton}
          </button>
        </div>
      </div>

      {/* FILTERS BAR */}
      <div style={styles.filtersBar}>
        <div style={styles.filtersLeft}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>{t.searchLabel}</label>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>{t.pulseFilterLabel}</label>
            <select
              value={pulseFilter}
              onChange={(e) => setPulseFilter(e.target.value as PulseFilter)}
              style={styles.select}
            >
              <option value="all">{t.pulseFilter_all}</option>
              <option value="1">{t.pulseFilter_1}</option>
              <option value="3">{t.pulseFilter_3}</option>
              <option value="5">{t.pulseFilter_5}</option>
            </select>
          </div>
        </div>

        <div style={styles.filtersRight}>{visibleLabel}</div>
      </div>

      {/* Pulse legend */}
      <div style={styles.pulseLegend}>{t.pulseLegend}</div>

      {/* TABLE / MOBILE CARDS */}
      <div style={styles.tableWrapper}>
        {loading && <div style={styles.loading}>{t.loading}</div>}

        {error && (
          <div style={styles.errorBox}>
            {t.errorPrefix}: {error}
          </div>
        )}

        {!loading && !error && sortedIdeas.length > 0 && (
          isMobile ? (
            // мобільні картки
            <div
              style={{
                padding: "8px 10px 10px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                maxHeight: 520,
                overflowY: "auto",
              }}
            >
              {sortedIdeas.map((idea) => {
                const pulseStyle = getPulseBadgeStyle(idea.pulse);
                return (
                  <div
                    key={idea.id}
                    style={{
                      borderRadius: 14,
                      border: "1px solid #1f2937",
                      background:
                        "radial-gradient(circle at top left, rgba(37,99,235,0.15), transparent 55%) #020617",
                      padding: "10px 12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                    onClick={() => setSelectedIdea(idea)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#e5e7eb",
                          flex: 1,
                          marginRight: 6,
                        }}
                      >
                        {idea.title}
                      </div>
                      <span
                        style={{
                          ...styles.pulseBadgeBase,
                          ...pulseStyle,
                          fontSize: 11,
                        }}
                      >
                        <span>⚡</span>
                        <span>{idea.pulse ?? 0}</span>
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: "#cbd5f5",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {idea.description}
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 6,
                        fontSize: 11,
                        color: "#64748b",
                      }}
                    >
                      <span>
                        {idea.author || "anonymous"} ·{" "}
                        {formatDate(idea.created_at)}
                      </span>
                      {idea.proof_hash && (
                        <span
                          style={{
                            fontFamily: "monospace",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {idea.proof_hash.slice(0, 6)}…
                          {idea.proof_hash.slice(-4)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // десктопна таблиця
            <div style={styles.scrollArea}>
              <table style={styles.table}>
                <colgroup>
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "32%" }} />
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "12%" }} />
                  <col style={{ width: "12%" }} />
                  <col style={{ width: "8%" }} />
                </colgroup>
                <thead>
                  <tr style={styles.headRow}>
                    <th style={{ ...styles.thBase, ...styles.thWithRightBorder }}>
                      {t.table_idea}
                    </th>
                    <th style={{ ...styles.thBase, ...styles.thWithRightBorder }}>
                      {t.table_description}
                    </th>
                    <th style={{ ...styles.thBase, ...styles.thWithRightBorder }}>
                      {t.table_proof_token}
                    </th>
                    <th
                      style={{
                        ...styles.thBase,
                        ...styles.thWithRightBorder,
                        cursor: "pointer",
                      }}
                      onClick={() => handleSort("pulse")}
                    >
                      <span style={styles.thPulseHeader}>
                        <span>{t.table_pulse}</span>
                        <span
                          style={styles.tooltipIcon}
                          title={t.pulseTooltip}
                        >
                          ?
                        </span>
                        <span style={styles.thPulseIcon}>
                          {sortIcon("pulse")}
                        </span>
                      </span>
                    </th>
                    <th style={{ ...styles.thBase, ...styles.thWithRightBorder }}>
                      {t.table_author}
                    </th>
                    <th
                      style={{ ...styles.thBase, cursor: "pointer" }}
                      onClick={() => handleSort("date")}
                    >
                      <span style={styles.thPulseHeader}>
                        <span>{t.table_date}</span>
                        <span style={styles.thPulseIcon}>
                          {sortIcon("date")}
                        </span>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sortedIdeas.map((idea) => {
                    const isHovered = hoveredRowId === idea.id;
                    const pulseStyle = getPulseBadgeStyle(idea.pulse);

                    return (
                      <tr
                        key={idea.id}
                        style={{
                          ...styles.rowBase,
                          ...(isHovered ? styles.rowHover : {}),
                        }}
                        onMouseEnter={() => setHoveredRowId(idea.id)}
                        onMouseLeave={() => setHoveredRowId(null)}
                        onClick={() => setSelectedIdea(idea)}
                      >
                        <td
                          style={{
                            ...styles.tdBase,
                            ...styles.tdWithRightBorder,
                            ...styles.ideaCell,
                          }}
                        >
                          {idea.title}
                        </td>

                        <td
                          style={{
                            ...styles.tdBase,
                            ...styles.tdWithRightBorder,
                            ...styles.descCell,
                          }}
                        >
                          {idea.description}
                        </td>

                        <td
                          style={{
                            ...styles.tdBase,
                            ...styles.tdWithRightBorder,
                          }}
                        >
                          {idea.proof_hash ? (
                            <div>
                              <div style={styles.proofLabel}>
                                {t.proofTokenLabel}
                              </div>
                              <div style={styles.proofShort}>
                                {shortHash(idea.proof_hash)}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div style={styles.proofLabel}>
                                {t.proofTokenLabel}
                              </div>
                              <div style={styles.proofShort}>
                                {t.proofTokenMissing}
                              </div>
                            </div>
                          )}
                        </td>

                        <td
                          style={{
                            ...styles.tdBase,
                            ...styles.tdWithRightBorder,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <span
                              style={{
                                ...styles.pulseBadgeBase,
                                ...pulseStyle,
                              }}
                            >
                              <span>⚡</span>
                              <span>{idea.pulse ?? 0}</span>
                            </span>

                            <button
                              style={{
                                border: "1px solid #334155",
                                background: "transparent",
                                color: "#e5e7eb",
                                borderRadius: 999,
                                fontSize: 11,
                                padding: "2px 6px",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePulseChange(idea.id, 1);
                              }}
                            >
                              +1
                            </button>

                            <button
                              style={{
                                border: "1px solid #334155",
                                background: "transparent",
                                color: "#94a3b8",
                                borderRadius: 999,
                                fontSize: 11,
                                padding: "2px 6px",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePulseChange(idea.id, -1);
                              }}
                            >
                              −1
                            </button>
                          </div>
                        </td>

                        <td
                          style={{
                            ...styles.tdBase,
                            ...styles.tdWithRightBorder,
                          }}
                        >
                          {idea.author || "anonymous"}
                        </td>

                        <td style={styles.tdBase}>
                          <span
                            style={{ fontSize: 12, color: "#94a3b8" }}
                          >
                            {formatDate(idea.created_at)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        )}

        {!loading && !error && sortedIdeas.length === 0 && (
          <div style={styles.emptyBox}>{t.noIdeasForFilter}</div>
        )}
      </div>

      {/* VIEW IDEA MODAL */}
      {selectedIdea && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedIdea(null)}
        >
          <div
            style={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <div style={styles.modalTitle}>{selectedIdea.title}</div>
                <div style={styles.modalMeta}>
                  {t.modal_created}: {formatDate(selectedIdea.created_at)}
                </div>
              </div>
              <button
                style={styles.modalClose}
                onClick={() => setSelectedIdea(null)}
              >
                ✕
              </button>
            </div>

            <div style={styles.modalTags}>
              <span
                style={{
                  ...styles.pulseBadgeBase,
                  ...getPulseBadgeStyle(selectedIdea.pulse),
                }}
              >
                <span>⚡</span>
                <span>{selectedIdea.pulse ?? 0}</span>
                <span>· {getPulseLevelName(selectedIdea.pulse, t)}</span>
              </span>
              <span style={{ color: "#e5e7eb" }}>
                {t.modal_author}:{" "}
                <span style={{ fontWeight: 500 }}>
                  {selectedIdea.author || "anonymous"}
                </span>
              </span>
            </div>

            <div style={styles.modalDesc}>{selectedIdea.description}</div>

            {selectedIdea.proof_hash && (
              <div style={styles.modalProofBox}>
                <div>{t.modal_proof_hash}:</div>
                <div style={styles.modalProofCode}>
                  {selectedIdea.proof_hash}
                </div>
              </div>
            )}

            <div style={styles.modalFooter}>
              <Link
                href={`/idea/${selectedIdea.slug || selectedIdea.id}`}
                style={{
                  ...styles.modalButton,
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onClick={() => setSelectedIdea(null)}
              >
                View public page
              </Link>

              <button
                style={styles.modalButton}
                onClick={() => setSelectedIdea(null)}
              >
                {t.modal_close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE IDEA MODAL */}
      {showCreateModal && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowCreateModal(false)}
        >
          <div
            style={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <div style={styles.modalTitle}>{t.createIdeaTitle}</div>
              </div>
              <button
                style={styles.modalClose}
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>{t.form_titleLabel}</label>
              <input
                style={styles.formInput}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                {t.form_descriptionLabel}
              </label>
              <textarea
                style={styles.formTextarea}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>{t.form_authorLabel}</label>
              <input
                style={styles.formInput}
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>{t.form_proofLabel}</label>
              <input
                style={{
                  ...styles.formInput,
                  fontFamily: "monospace",
                  fontSize: "12px",
                }}
                value={newProof}
                readOnly
              />
              <button
                style={{
                  ...styles.modalButton,
                  ...(generatingProof ? { opacity: 0.7 } : {}),
                  marginTop: "6px",
                  alignSelf: "flex-start",
                }}
                onClick={handleGenerateProof}
                disabled={generatingProof}
              >
                {generatingProof ? t.form_generating : t.form_generateProof}
              </button>
            </div>

            {formError && (
              <div style={styles.formError}>{formError}</div>
            )}

            <div style={styles.modalFooter}>
              <button
                style={styles.modalButtonSecondary}
                onClick={() => setShowCreateModal(false)}
              >
                {t.form_cancel}
              </button>
              <button
                style={{
                  ...styles.modalButton,
                  ...(creating ? { opacity: 0.7 } : {}),
                }}
                onClick={handlePublishIdea}
                disabled={creating}
              >
                {creating ? t.form_publishing : t.form_publish}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
